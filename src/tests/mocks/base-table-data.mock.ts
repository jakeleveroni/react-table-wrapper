import * as casual from 'casual-browserify';

export function generateBasicTableData(size: number): any[] {
    const arr = [];
    let length = size;

    if (!size) {
        length = casual.integer(1, 25);
    }

    for (let i = 0; i < length; ++i) {
        arr.push({
            firstName: casual.first_name,
            lastName: casual.last_name,
            email: casual.email,
            phone: casual.phone,
            signupDate: casual.date('MM-DD-YYYY'),
            locale: casual.locale,
            ssn: '666-77-1111',
            isSubscribed: casual.boolean
        });
    }
    return arr;
}
