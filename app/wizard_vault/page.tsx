// Wizard Vault - Lead to Dailies, Weeklies, Monthlies
'use client'

import useSWR from 'swr';
import { useContext, useEffect, useState } from 'react';
import {Context_ApiKey, Context_Account} from '/app/layout.tsx';

const fetcher = (url) => fetch(url).then(res => res.json());

const base = "https://api.guildwars2.com/v2/account/";

function ObjectiveComplete({current, complete}) {
	console.log("printing cookie: " + document.cookie);
	return (
		<>
			{
				current % complete == 0 && current != 0 ? <span style={{"color":"green"}}> {current} / {complete}</span> : <span style={{"color":"red"}}> {current} / {complete}</span>
			}
		</>
	)
}	

function Objective({objective}) {

	return (
		<div class="border-solid border-grey-50 border rounded mx-auto px-2 py-5 w-full max-w-xs break-normal">
			<h3><u>{objective.track}</u></h3>
			<h3>{objective.title}</h3>
			<span>Astral Reward: {objective.acclaim}</span>
			<p>Progress:
				<ObjectiveComplete current={objective.progress_current} complete={objective.progress_complete} />
			</p>
		</div>
	)
}

function ObjectiveCollection({objectives}) {
	const my_stylelol = "h-screen flex-col space-y-4 my-10 text-center mx-auto flex space-x-4";

	
	return (
		<div class={my_stylelol}>
			<h3 class={"rounded px-5 py-1 mx-auto " + ((objectives.meta_progress_current/objectives.meta_progress_complete) >= 1 ? " bg-green-900" : " bg-neutral-800")}>Objective Progress: {objectives.meta_progress_current} / {objectives.meta_progress_complete}</h3>
			<div class="flex flex-row flex-wrap s:px-0 md:px-0 justify-evenly">
				{objectives.objectives.map( objective => (<Objective id={objective.id} objective={objective} />))}
			</div>
		</div>

	)
}

function WeeklyCollection() {
	let { apiKey, setApiKey } = useContext(Context_ApiKey);

	const url = base + "wizardsvault/weekly"+"?access_token="+ apiKey;
	const { data, error, isLoading } = useSWR(url, fetcher);

	if (error) return <div>failed to load</div>
	if (isLoading) return <div>loading...</div>

	return (
		<>
		{!data.text ? <ObjectiveCollection objectives={data} /> : "Something is wrong with the api key"}
		</>
	)

}

function SpecialCollection() {
	let { apiKey, setApiKey } = useContext(Context_ApiKey);

	const url = base + "wizardsvault/special"+"?access_token="+ apiKey;
	const { data, error, isLoading } = useSWR(url, fetcher);

	if (error) return <div>failed to load</div>
	if (isLoading) return <div>loading...</div>

	return (
		<>
		{!data.text ? data.objectives.map( objective => (<Objective id={objective.id} objective={objective} />)) : "Something is wrong with the api key"}
		</>
	)

}

function DailyCollection() {

	let { apiKey, setApiKey } = useContext(Context_ApiKey);

	const url = base + "wizardsvault/daily"+"?access_token="+ apiKey;
	const { data, error, isLoading } = useSWR(url, fetcher);

	if (error) return <div>failed to load</div>
	if (isLoading) return <div>loading...</div>

	return (
		<>
		{!data.text ? <ObjectiveCollection objectives={data} /> : "Something is wrong with the api key"}
		</>
	)
}

export default function Page() {
	/*const [API_KEY, setAPI_KEY] = useState("");*/
	let { apiKey, setApiKey } = useContext(Context_ApiKey);
	let { account, setAccount } = useContext(Context_Account);

	const [ visDaily, setVisDaily] = useState(true);
	const [ visWeekly, setVisWeekly] = useState(false);
	const [ visSpecial, setVisSpecial] = useState(false);

	function toggleDaily() {
		setVisDaily(true);
		setVisWeekly(false);
		setVisSpecial(false);
	}

	function toggleWeekly() {
		setVisDaily(false);
		setVisWeekly(true);
		setVisSpecial(false);
	}

	function toggleSpecial() {
		setVisDaily(false);
		setVisWeekly(false);
		setVisSpecial(true);
	}
	useEffect( () => {
		console.log(document.cookie);
		try {
			let cookieApi = document.cookie.match(/(?<=apikey\=).*/)[0] != null ? document.cookie.match(/(?<=apikey\=).*/)[0] : "";
			console.log(cookieApi);
			setApiKey(cookieApi);
		} catch {
			console.log("error retrieving api key from cookie");
		}
	}, [/*document.cookie*/]);
	
	return (
		<>
		<Context_ApiKey.Provider value={{"apiKey": apiKey, "setApiKey": setApiKey}}>
		<div>
			<h1>Welcome to the wizard vault!!!</h1>
			<div id="tab-list" class=" pt-5">
			<ul class="flex flex-row justify-around">
			<li><button class={"p-4 " + (visDaily ? " border-b text-blue-900 border-blue-900 " : " border-transparent ")} onClick={ () => toggleDaily()/*setVisDaily(!visDaily)*/ }> Daily </button></li>
			<li><button class={"p-4 " + (visWeekly ? "border-b text-blue-900 border-blue-900" : " border-transparent ")} onClick={ () => toggleWeekly() }> Weekly </button></li>
			<li><button class={"p-4 " + (visSpecial ? "border-b text-blue-900 border-blue-900" : " border-transparent ")} onClick={ () => toggleSpecial() }> Special </button></li>
			</ul>
			</div>
			<div id="tab-container" class="bg-neutral-950">
				<div class={visDaily ? "" : "hidden"}><DailyCollection /></div>
				<div class={visWeekly ? "" : "hidden"}><WeeklyCollection /></div>
				<div class={visSpecial? "" : "hidden"}><SpecialCollection /></div>
			</div>
		</div>
		</Context_ApiKey.Provider>
		</>
	)
}
