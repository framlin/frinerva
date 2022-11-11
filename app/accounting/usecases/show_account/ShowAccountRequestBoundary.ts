import {UseCaseRequestBoundary} from "../../../common/usecase/UseCaseRequestBoundary";
import {AccountData} from "../../entites/Account";

export interface ShowAccountRequestBoundary extends UseCaseRequestBoundary {
    submit(account_data: AccountData): Promise<void>;
}