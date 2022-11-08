import {TUseCaseName} from "../../../../../common/use_case/TUseCaseName";
import {TGetPropertyNames} from "../../../../../common/util/TGetPropertyNames";
import {ReadCSVFileResponseBoundary} from "../ReadCSVFileResponseBoundary";
import {ReadCSVFileView} from "./ReadCSVFileView";

export type TReadCSVFileViewChannelName = `${TUseCaseName}:${TGetPropertyNames<ReadCSVFileResponseBoundary>}`;