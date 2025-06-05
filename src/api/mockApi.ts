export async function fetchCompanyList(): Promise<{ name: string; eik: string }[]> {
    try {
        const res = await fetch('/mock/companies.json');

        if (!res.ok) {
            throw new Error('Failed to fetch company data');
        }

        return await res.json();
    } catch (error) {
        console.error('Error fetching company list:', error);
        throw error;
    }
}
