import React, { useState } from 'react';

const UseFetch = ({ cb }: { cb: any }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<any>(null);

    const fn = async (...args: any) => {
        setLoading(true);
        setError(null);
        try {
            const response = await cb(...args);
            setData(response);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
                // toast.error(error.message);
            } else {
                setError(String(error));
            }
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, fn };
};

export default UseFetch;
