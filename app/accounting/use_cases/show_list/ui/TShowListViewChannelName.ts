import {TUseCaseName} from "../../../../common/use_case/TUseCaseName";
import {TGetPropertyNames} from "../../../../common/util/TGetPropertyNames";
import {ShowListView} from "./ShowListView";

export type TShowListViewChannelName = `${TUseCaseName}:${TGetPropertyNames<ShowListView>}`;