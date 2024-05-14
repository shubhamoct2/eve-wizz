

const validateVenue = (venueData: any) => {
    let errors = [];
    const result = venueSchema.safeParse(venueData);
    if (!result?.success) {
        const {issues} = result?.error;
        if (issues.length === 1 && issues[0].path.length < 1)
            return issues[0].message;

        issues.forEach(({path, message}) => {
            errors[path.join('-')] = message;
        });
        return {
            status: false,
            errors
        };
    }
    return true;
}

export default validateVenue;