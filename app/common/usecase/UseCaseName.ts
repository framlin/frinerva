import {UseCases as AccountingUseCases} from "../../accounting/usecases";
import {UseCases as BalancingUseCases} from "../../balancing/usecases";
import {UseCases as InvoicingUseCases} from "../../invoicing/usecases";

export type UseCaseName = keyof typeof AccountingUseCases | keyof typeof BalancingUseCases| keyof typeof InvoicingUseCases;

let ucn: UseCaseName = "show_account";
