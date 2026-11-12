# CBACT04C business rules (interest calculation)

| | |
|---|---|
| Program | `app/cbl/CBACT04C.cbl` (652 lines) |
| JCL | `app/jcl/INTCALC.jcl`, step `STEP15`, `PARM='2022071800'` |
| Chain | `interest` (`tools/runjcl/chains.json`) |
| Copybooks | `CVTRA01Y` (TCATBALF), `CVACT03Y` (XREF), `CVTRA02Y` (DISCGRP), `CVACT01Y` (account), `CVTRA05Y` (transaction) |
| Fixtures | `fixtures/interest/i01`-`i07` |

Line numbers refer to `app/cbl/CBACT04C.cbl` as committed. The main line has no
paragraph name; it is listed as `PROCEDURE DIVISION` (lines 180-232). This document
is derived from the COBOL source and checked against the golden files in
`fixtures/interest/*/expected`. Nothing under `app/` or `fixtures/` was changed.

## What the program does

For each transaction-category balance on `TCATBALF`, CBACT04C looks up the annual
interest rate for the account's disclosure group, computes one month of interest,
and writes an interest transaction to a new `SYSTRAN` generation. When the account
number changes, it adds the previous account's total interest to its current
balance and zeroes its cycle credit and debit. Fees are not implemented.

## Business rules

| ID | Rule (plain English) | COBOL paragraph | Lines |
|---|---|---|---|
| BR-01 | The run takes a 10-character run-date parameter from the JCL `PARM`. It is used only as the prefix of every generated transaction ID. INTCALC passes `2022071800`. | `LINKAGE SECTION`, `PROCEDURE DIVISION USING` | 176-180 |
| BR-02 | Files and access modes: category balances (`TCATBALF`) are read sequentially, card cross-reference (`XREFFILE`) and disclosure groups (`DISCGRP`) are read by key, the account master (`ACCTFILE`) is opened for update, and interest transactions (`TRANSACT`) are written to a new output file. | `FILE-CONTROL`; `0000-TCATBALF-OPEN`, `0100-XREFFILE-OPEN`, `0200-DISCGRP-OPEN`, `0300-ACCTFILE-OPEN`, `0400-TRANFILE-OPEN` | 27-56, 182-186, 234-323 |
| BR-03 | If any file fails to open (status other than `00`), the job abends. | `0000`-`0400` open paragraphs | 237-249, 255-267, 273-285, 292-304, 310-322 |
| BR-04 | Every category-balance record is processed once, in `TCATBALF` key order (account ID, transaction type, category code), until end of file (status `10`). Any other read error abends the job. | `PROCEDURE DIVISION`; `1000-TCATBALF-GET-NEXT` | 188-222, 325-348 |
| BR-05 | Each category-balance record read is counted and echoed as-is to SYSOUT. | `PROCEDURE DIVISION` | 192-193 |
| BR-06 | Account break: when a record's account ID differs from the previous record's, the previous account is posted (BR-15). This does not happen for the first account of the run. The running interest total is then reset to zero, and the new account's master record and card cross-reference are loaded. | `PROCEDURE DIVISION` | 194-206 |
| BR-07 | Every account on `TCATBALF` must exist on the account master. If it does not, the program displays `ACCOUNT NOT FOUND: <id>` and `ERROR READING ACCOUNT FILE` and abends. | `1100-GET-ACCT-DATA` | 372-391 |
| BR-08 | Every account must have a card cross-reference, looked up by account ID through the alternate key. If it does not, the program displays `ACCOUNT NOT FOUND: <id>` and `ERROR READING XREF FILE` and abends. The card number found goes on the account's interest transactions. | `1110-GET-XREF-DATA` | 393-413 |
| BR-09 | The interest rate is looked up by the account's group ID (`ACCT-GROUP-ID`) plus the balance's transaction type and category code. | `PROCEDURE DIVISION`; `1200-GET-INTEREST-RATE` | 210-213, 415-420 |
| BR-10 | Default-group fallback: if no rate exists for the account's group (status `23`), the program displays `DISCLOSURE GROUP RECORD MISSING` and `TRY WITH DEFAULT GROUP CODE` and retries with group `DEFAULT` and the same type and category. If the `DEFAULT` row is also missing, or either read fails with any other status, the job abends. | `1200-GET-INTEREST-RATE`, `1200-A-GET-DEFAULT-INT-RATE` | 416-439, 443-460 |
| BR-11 | A category whose rate is exactly zero earns no interest, and no transaction is written for it. | `PROCEDURE DIVISION` | 214-217 |
| BR-12 | Monthly interest = category balance x annual rate (in percent) / 1200, which is the rate divided by 12 months and by 100. The result has 2 decimal places (`S9(09)V99`). | `1300-COMPUTE-INTEREST` | 464-465 |
| BR-13 | Each category's monthly interest is added to the account's running interest total. | `1300-COMPUTE-INTEREST` | 467 |
| BR-14 | One interest transaction is written per category with a non-zero rate:<br>- `TRAN-ID` = run-date PARM + a 6-digit sequence that starts at `000001` and runs across the whole job<br>- type `01`, category `0005`, source `System`<br>- description `Int. for a/c ` + 11-digit account ID<br>- amount = the monthly interest<br>- merchant ID 0, blank merchant name, city and zip<br>- card number from the cross-reference<br>- original and processed timestamps = current time<br>A write error abends the job. | `1300-B-WRITE-TX` | 473-515 |
| BR-15 | Account posting: the account's total interest is added to `ACCT-CURR-BAL`, `ACCT-CURR-CYC-CREDIT` and `ACCT-CURR-CYC-DEBIT` are set to zero, and the account record is rewritten. A rewrite error abends the job. (See Q-02 for the last account.) | `1050-UPDATE-ACCOUNT` | 350-370 |
| BR-16 | Fees: there is a fee step for every interest-bearing category, but it is empty ("To be implemented"), so no fees are charged. | `1400-COMPUTE-FEES` | 216, 518-520 |
| BR-17 | Transaction timestamps are in Db2 format `YYYY-MM-DD-HH.MM.SS.hh0000`, built from the system clock. | `Z-GET-DB2-FORMAT-TIMESTAMP` | 613-626 |
| BR-18 | At the end, all five files are closed. A close error abends the job. | `9000`-`9400` close paragraphs | 224-228, 522-611 |
| BR-19 | A normal run displays `START OF EXECUTION OF PROGRAM CBACT04C` and `END OF EXECUTION OF PROGRAM CBACT04C` and ends with return code 0. `RETURN-CODE` is never set. | `PROCEDURE DIVISION` | 181, 230-232 |
| BR-20 | Abend handling: the program displays `ABENDING PROGRAM` and calls `CEE3ABD` with abend code 999 and timing 0 (off-host: `tools/stubs/CEE3ABD.cbl`, RC 12). Before that it shows the file status as `FILE STATUS IS: NNNN` followed by a 4-character code. | `9999-ABEND-PROGRAM`, `9910-DISPLAY-IO-STATUS` | 628-648 |

## Legacy quirks and edge cases

These quirks are in the golden files and must be reproduced unless the business
decides otherwise. "Verified" means one of these checks was done:

- the golden fixtures show the behaviour, or
- a throw-away GnuCOBOL program compiled with the estate flags `-std=ibm -fsign=EBCDIC` (kept outside the repo) shows it.

| ID | Quirk | Lines | Evidence |
|---|---|---|---|
| Q-01 | **Truncation, not rounding.** `COMPUTE WS-MONTHLY-INT` has no `ROUNDED`, so digits beyond the second decimal are dropped. 1235.50 x 12.00 / 1200 = 12.355 becomes **12.35**; a half-even port gives 12.36. For negative balances the truncation is toward zero: -300.50 x 12.00 / 1200 = -3.005 becomes **-3.00**, not -3.01. | 464-465 | `i02-tie-half-cent` (account 2003); `i07` non-tie values agree under both rules; negative case checked with a scratch `cobc` program |
| Q-02 | **The last account is never posted.** The end-of-file flag is set inside the loop body (line 340), so the loop ends before the `ELSE PERFORM 1050-UPDATE-ACCOUNT` branch (lines 219-220) can run. That branch is dead code. For the last account on `TCATBALF`, the interest transactions are written but `ACCT-CURR-BAL` is not updated and the cycle credit and debit are not reset. A run with only one account updates no account at all. | 188-222, 340 | Every case. In `i01` account 2002 keeps 2400.00 and cycle credit 240.00. In `i03`-`i06` (one account each) the account file comes out unchanged. |
| Q-03 | **The fixture READMEs contradict the golden files.** `i01`, `i05` and `i06` README text says the balance is updated for every account. The golden `expected/` files show Q-02 instead (for example, `i05` account 2007 stays at 1500.00 and `i06` account 2008 stays at -300.00). The golden files are authoritative. | - | `fixtures/interest/i01`, `i05`, `i06` |
| Q-04 | **Accounts with no interest are still rewritten.** Every account except the last is rewritten at the account break, even if all its categories had a zero rate (total interest 0.00). Its cycle credit and debit are still set to zero. | 194-196, 350-356 | Read from the code (no fixture has a non-last, all-zero-rate account) |
| Q-05 | **Only the rate is checked, not the balance.** A zero balance with a non-zero rate still writes a **0.00** interest transaction and uses a transaction ID. A negative rate is not rejected and produces negative interest. | 214 | Read from the code |
| Q-06 | **Negative balances earn negative interest.** A credit balance produces a negative interest transaction (a credit to the customer). | 464-467, 490 | `i06-negative-balance`: `TRAN-AMT` -3.00 |
| Q-07 | **Silent high-order truncation.** No `ON SIZE ERROR` on `COMPUTE` (464), `ADD` to the total (467), `ADD` to `ACCT-CURR-BAL` (352) or the sequence `ADD` (474). Example: 999,999,999.99 x 9999.99 / 1200 = 8,333,324,999.91 is stored as **333,324,999.91**. | 352, 464-467, 474 | Scratch `cobc` program |
| Q-08 | **Transaction IDs wrap.** `WS-TRANID-SUFFIX PIC 9(06)` goes from 999999 to **000000**, so a run with more than 999,999 interest transactions repeats IDs. | 173, 474-480 | Scratch `cobc` program (`999999 + 1 = 000000`) |
| Q-09 | **The run-date PARM is used unchecked.** `PARM-LENGTH` is never tested, so a short or missing PARM still fills the first 10 bytes of `TRAN-ID` with whatever is in the parameter area. The JCL value `2022071800` is `YYYYMMDD` + `00`, not a date, and it is never validated or used as the posting date. | 177-178, 476-480 | INTCALC JCL; all golden `TRAN-ID`s start `2022071800` |
| Q-10 | **Timestamps are clock time, not the run date.** Both timestamps come from `FUNCTION CURRENT-DATE`, read again for each transaction, so on the mainframe they can differ within one run. Only hundredths of a second are kept and the last 4 digits are always `0000`. Off-host the clock is frozen at `2022-07-05 10:00:00.00`, giving `2022-07-05-10.00.00.000000`. | 496-498, 613-626 | All golden `SYSTRAN` files |
| Q-11 | **Parts of the record area are never set.** `STRING` does not pad, so only the first 24 of the 100 bytes of `TRAN-DESC` are written, and the 20-byte `FILLER` is never set. Both keep whatever was in `TRAN-RECORD` at load time (spaces under GnuCOBOL; IBM Enterprise COBOL does not guarantee this without `VALUE` or a storage-initialising option). The goldens show spaces. | 485-489; `CVTRA05Y` | Golden `SYSTRAN` files; scratch `cobc` (`STRING` leaves the tail unchanged) |
| Q-12 | **The interest category is hard-coded.** Every interest transaction is type `01` / category `05`, whatever category produced it. `'05'` is moved into `PIC 9(04)` and written as `0005`. The source category is not recorded on the transaction. | 482-483 | Golden `SYSTRAN` (`010005`) |
| Q-13 | **`TCATBALF` is not updated.** The category balances are read-only and are not reduced or reset after interest is charged, and nothing marks the month as done. Running INTCALC twice charges interest twice. | 236, 326 | Read from the code |
| Q-14 | **An abend leaves the run half-done.** Accounts posted before an abend have already been rewritten. On z/OS the new `SYSTRAN` generation is deleted (`DISP=(NEW,CATLG,DELETE)`), so balances can include interest that has no transaction behind it, and a rerun posts those accounts again. | 350-370; INTCALC `TRANSACT` DD | Inferred from code and JCL (no abend fixture) |
| Q-15 | **Which card is used depends on the alternate-index order.** The cross-reference is read by the account-ID alternate key (`XREFFIL1` path). If an account has several cards, the first one in that order goes on all of its interest transactions. | 204-205, 394-395 | Read from the code (fixtures have one card per account) |
| Q-16 | **The default-group fallback is repeated per category.** The `DISCLOSURE GROUP RECORD MISSING` / `TRY WITH DEFAULT GROUP CODE` pair is shown for every category that falls back, and the result is not cached. If the `DEFAULT` row has a zero rate, the category is skipped without any message. | 416-439 | `i04-default-group-fallback` SYSOUT |
| Q-17 | **Misleading or odd operator messages** (they are part of SYSOUT parity):<br>- A missing card cross-reference says `ACCOUNT NOT FOUND:` (397).<br>- A `DISCGRP` open failure says `ERROR OPENING DALY REJECTS FILE` (281).<br>- An `XREF` open failure prints the status twice (263).<br>- `9910` prints the literal `NNNN` before the code, e.g. `FILE STATUS IS: NNNN0023` (642, 646).<br>- Category records are echoed raw with their zoned-decimal sign character (for example `...0000010000{`). | 193, 263, 281, 397, 642-646 | Golden SYSOUT (echo lines); messages read from the code |
| Q-18 | **The record counter is never used.** `WS-RECORD-COUNT` is incremented but never displayed or checked. | 172, 192 | Read from the code |
| Q-19 | **Fees are a no-op.** `1400-COMPUTE-FEES` is called but empty (BR-16). A port must not invent fee logic. | 518-520 | Read from the code |

## Fixture coverage

| Case | Rules / quirks exercised |
|---|---|
| `i01-baseline` | BR-04, BR-06, BR-12, BR-14, BR-15 (account 2001), Q-02 (account 2002), Q-03 |
| `i02-tie-half-cent` | Q-01 (2003: 12.355 -> 12.35; 2004: 12.345 -> 12.34), BR-15, Q-02 |
| `i03-zero-rate-skipped` | BR-11 (type 02 at 0.00 %), Q-02 |
| `i04-default-group-fallback` | BR-10, Q-16 (group `PLATINUM` -> `DEFAULT`, 21.00 %), Q-02 |
| `i05-multi-category` | BR-13, BR-14 (two transactions for one account), Q-02, Q-03 |
| `i06-negative-balance` | Q-06, Q-02, Q-03 |
| `i07-nontie-rounding` | BR-12 (15.42175 -> 15.42, 13.610975 -> 13.61), BR-09 (account in group `DEFAULT` directly), Q-02 |

No fixture covers BR-03, BR-07, BR-08, BR-18 or BR-20 (abend paths), Q-04, Q-05,
Q-07, Q-08, Q-13, Q-14 or Q-15.
