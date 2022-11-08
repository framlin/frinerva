import {UseCaseName} from "../../../../common/use_case/UseCaseName";
import {GetPropertyNames} from "../../../../common/util/GetPropertyNames";
import {ReadCSVFileResponseBoundary} from "./ReadCSVFileResponseBoundary";
import {ReadCSVFileView} from "./ui/ReadCSVFileView";

export type ReadCSVFileResponseChannelName = `${UseCaseName}:${GetPropertyNames<ReadCSVFileResponseBoundary>}`;