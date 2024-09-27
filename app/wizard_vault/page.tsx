// Wizard Vault - Lead to Dailies, Weeklies, Monthlies
'use client'

import useSWR from 'swr';
import { useContext, useEffect } from 'react';
import {Context_ApiKey, Context_Account} from '/app/layout.tsx';

const fetcher = (url) => fetch(url).then(res => res.json());

const base = "https://api.guildwars2.com/v2/account/";

function DailyComplete({current, complete}) {
	console.log("printing cookie: " + document.cookie);
	return (
		<>
			{
				current % complete == 0 ? <span style={{"color":"green"}}> {current} / {complete}</span> : <span style={{"color":"red"}}> {current} / {complete}</span>
			}
		</>
	)
}	

function Daily({daily}) {

	return (
		<div class="border-solid border-grey-50 border rounded mx-auto px-2 py-5 w-full max-w-xs break-normal">
			<h3><u>{daily.track}</u></h3>
			<h3>{daily.title}</h3>
			<span>Astral Reward: {daily.acclaim}</span>
			<p>Progress:
				<DailyComplete current={daily.progress_current} complete={daily.progress_complete} />
			</p>
		</div>
	)
}

function DailyCollection({dailies}) {
	const my_stylelol = "h-screen flex-col space-y-4 my-10 text-center mx-auto flex space-x-4";

	return (
		<div class={my_stylelol}>
			<h3 class={"rounded px-5 py-1 mx-auto " + (dailies.meta_progress_current/dailies.meta_progress_complete >= 1 ? " bg-green-900" : " bg-blue-200")}>Daily Progress: {dailies.meta_progress_current} / {dailies.meta_progress_complete}</h3>
			<div class="flex flex-row flex-wrap s:px-0 md:px-0 justify-evenly">
				{dailies.objectives.map( objective => (<Daily id={objective.id} daily={objective} />))}
			</div>
		</div>

	)
}
			

export default function Page() {
	/*const [API_KEY, setAPI_KEY] = useState("");*/
	let { apiKey, setApiKey } = useContext(Context_ApiKey);
	let { account, setAccount } = useContext(Context_Account);
	useEffect( () => {

	console.log(document.cookie);
	let cookieApi = document.cookie.match(/(?<=apikey\=)\S*(?=;)/);
	console.log(cookieApi);
	setApiKey(cookieApi);
	}, [/*document.cookie*/]);
	

	const url = base + "wizardsvault/daily"+"?access_token="+(apiKey ? apiKey : document.cookie);
	const { data, error, isLoading } = useSWR(url, fetcher);

	if (error) return <div>failed to load</div>
	if (isLoading) return <div>loading...</div>
	

	return (
		<div>
			<h1>Welcome to the wizard vault!!!</h1>
			{ data.objectives ? <DailyCollection dailies={data} /> : <></>}
		</div>
	)
}
