import {UseCasePresenter} from "../UseCasePresenter";

class ipcChannelMock {
    send() {
    }
}

const ipc_channel = new ipcChannelMock();

describe('use case presenter', () => {
    it('can be created', () => {
        // @ts-ignore
        const presenter = new UseCasePresenter(ipc_channel);
        presenter.execute('use_case_name', 'data');
        expect(presenter).toBeInstanceOf(UseCasePresenter);
    });

    it('calls send method of ipc channel, if execute is called', () => {
        // @ts-ignore
        const presenter = new UseCasePresenter(ipc_channel);
        const spy = jest.spyOn(ipc_channel, 'send');
        presenter.execute('use_case_name', 'data');
        expect(spy).toBeCalledWith('use_case:created', 'use_case_name', 'data');
    });
});
