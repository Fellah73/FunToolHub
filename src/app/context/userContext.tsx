'use client';
import { User } from '@prisma/client';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

const UserContext = createContext<{
    user: User | null;
    setUser: (user: User) => void;
    revalidateUser: () => Promise<void>;
    loading: boolean,
} | null>(null);

// 3️⃣ `UserProvider` qui récupère et partage `user`
export function UserProvider({ children }: { children: React.ReactNode }) {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const isFetching = useRef(false);

    useEffect(() => {

        if (isFetching.current) return
        const fetchUser = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/me`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (!res.ok) throw new Error('Failed to fetch user data');

                const data = await res.json();
                setUser(data.user);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();

        isFetching.current = true;

    }, []);

    const revalidateUser = async () => {
        console.log("revalidating user process...");
        const res = await fetch(`http://localhost:3000/api/me`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        const data = await res.json();
        setUser(data.user);
        console.log("user in context is updated");
    };

    return (
        <UserContext.Provider value={{ user, setUser, revalidateUser, loading }}>
            {children}
        </UserContext.Provider>
    );
}

// 5️⃣ Hook personnalisé pour accéder à `UserContext`
export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
