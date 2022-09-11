function create_work_bench(business_case_name) {
    let work_bench_div =
`
<div class='hbox>
</div>
`

}


const BusinessCases = {
    accounting: () => {

    }
}

class BusinessCaseFactory {

    static create(business_case_name) {
        return BusinessCases[business_case_name]();
    }
}

module.exports = BusinessCaseFactory;