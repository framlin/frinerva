import {UseCaseRequestBoundary} from "../../../common/use_case/UseCaseRequestBoundary";
import {AccountData} from "../../entites/Account";

export interface ShowAccountRequestBoundary extends UseCaseRequestBoundary {
    submit(account_data: AccountData): Promise<void>;
}