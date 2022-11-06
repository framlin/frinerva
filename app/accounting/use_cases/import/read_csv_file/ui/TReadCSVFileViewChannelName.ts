import {TUseCaseName} from "../../../../../common/use_case/TUseCaseName";
import {TGetPropertyNames} from "../../../../../common/util/TGetPropertyNames";
import {ReadCSVFileView} from "./ReadCSVFileView";

export type TReadCSVFileViewChannelName = `${TUseCaseName}:${TGetPropertyNames<ReadCSVFileView>}`;