export const retryWithBackoff = async (
    fn: () => Promise<any>,
    retries = 1,
    delay = 1000
) => {
    let attempt = 0;
    while (attempt < retries) {
        try {
            return await fn();
        } catch (e) {
            attempt++;
            if (attempt >= retries) throw e;
            await new Promise((resolve) => setTimeout(resolve, delay * 2 ** attempt));
        }
    }
};
