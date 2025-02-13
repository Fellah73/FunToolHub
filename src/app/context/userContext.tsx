'use client';
import { User } from '@prisma/client';
import { createContext, useContext, useEffect, useRef, useState } from 'react';


// 2️⃣ Création du contexte `UserContext`
const UserContext = createContext<{
    user: User | null;
    setUser: (user: User) => void;
    revalidateUser: () => Promise<void>;
    loading: boolean,
    currentUserId: string | null
} | null>(null);

// 3️⃣ `UserProvider` qui récupère et partage `user`
export function UserProvider({ userId, children }: { userId: string, children: React.ReactNode }) {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const isFetching = useRef(false);

    useEffect(() => {
        if (!userId) {
            setLoading(false);
            return;
        }; // 🔥 Empêche de fetch si `id` est absent

        if (isFetching.current) return

        console.log("user id", userId);
        setCurrentUserId(userId);

        const fetchUser = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/user?id=${userId}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    next: { tags: ['user-profile'] } // 🏷 Associe le cache au tag
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

        console.log("user in context", user);

        isFetching.current = true;
        
    }, [userId]); // 🔥 Re-fetch quand `userId` change

    useEffect(() => {
        console.log("user in context", user);
    }, [user]);

    // 4️⃣ Fonction pour revalider le cache
    const revalidateUser = async () => {
        console.log("revalidating user process...");
        // function to refech every time the user is change 
        const res = await fetch(`http://localhost:3000/api/user?id=${userId}`, { method: "GET", next: { tags: ["user-profile"] } });
        const data = await res.json();
        setUser(data.user);
        console.log("user in context is updated");
    };

    return (
        <UserContext.Provider value={{ user, setUser, revalidateUser, loading, currentUserId }}>
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
