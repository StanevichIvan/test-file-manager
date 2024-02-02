export const createState = () => {
    let state = {
        workDirectory: '~',
    };

    return {
        getState() {
            return state;
        },
        setState(patch) {
            state = {...state, ...patch};
        }
    };
};
