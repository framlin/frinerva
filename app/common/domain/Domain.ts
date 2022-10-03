
class Domain {
    get domain_name() {
        return this._domain_name;
    }

    constructor(domain_name: string, factories: any) {
        this._domain_name = domain_name;
        this._factories = factories;
    }

    create_use_case(use_case_name: string) {

        return this._factories.use_case.create(use_case_name);
    }

    _factories;
    _domain_name;
}

module.exports = {Domain};
export {Domain}