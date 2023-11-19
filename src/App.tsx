import { Auth } from "@supabase/auth-ui-react";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "./supabase/supabaseClient";
import DashBoard from "./pages/DashBoard";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import GameHistory from "./pages/GameHistory";
import Tournament from "./pages/Tournament";
import Profile from "./pages/Profile";

function App() {

	const [session, setSession] = useState<Session | null>(null);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
		return () => subscription.unsubscribe();
	}, []);
	if (!session) {
		return (
			<div className="flex w-full items-center justify-center min-h-screen">
				<div className="bg-form rounded-md w-full max-w-md p-10 shadow-2xl">
					<div className="w-full flex items-center justify-center pb-10">
						<img src="./logo.png" className="w-[10rem] " alt="" />
					</div>
					<Auth
						supabaseClient={supabase}
						appearance={{
							style: {
								button: {
									background: '#3182CE',
									border: 'none',
									color: '#FFFFFF',
									padding: '8px',
									borderRadius: '4px'
								},
								anchor: {
									color: 'black',
									textDecoration: 'none'
								},
								input: {
									background: '#F7FAFC',
									color: '#A0AEC0',
									border: '0.5px solid grey',
									padding: '8px',
									borderRadius: '4px'
								},
								label: {
									color: 'grey'
								}
							},
						}}
						providers={[]}
					/>
				</div>
			</div>
		);
	} else {
		return (
			<Router>
				<div className="flex flex-row">
					<DashBoard />
					<Routes>
						<Route path="/game-history" element={<GameHistory />} />
						<Route path="/tournament" element={<Tournament />} />
						<Route path="/profile" element={<Profile />} />
					</Routes>
				</div>

			</Router>
		);
	}
}

export default App;
