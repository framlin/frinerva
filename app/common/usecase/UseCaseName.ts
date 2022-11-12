import {UseCases as AccountingUseCases} from "../../accounting/usecases";
import {UseCases as BalancingUseCases} from "../../balancing/usecases";

export type UseCaseName = keyof typeof AccountingUseCases | keyof typeof BalancingUseCases;
