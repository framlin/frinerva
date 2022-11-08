import {TUseCaseName} from "../../../../common/use_case/TUseCaseName";
import {TGetPropertyNames} from "../../../../common/util/TGetPropertyNames";
import {ReadCSVFileResponseBoundary} from "./ReadCSVFileResponseBoundary";
import {ReadCSVFileView} from "./ui/ReadCSVFileView";

export type ReadCSVFileResponseChannelName = `${TUseCaseName}:${TGetPropertyNames<ReadCSVFileResponseBoundary>}`;