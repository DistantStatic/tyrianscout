// Wizard Vault - Lead to Dailies, Weeklies, Monthlies
'use client'

import useSWR from 'swr';

const fetcher = (url) => fetch(url).then(res => res.json());

const API_KEY = "93CDBF1A-F815-A049-9F71-94B78C4DFAFEA26118B9-D719-4CB9-A315-D83B1269FD7E";
const base = "https://api.guildwars2.com/v2/account/";

function DailyComplete({current, complete}) {
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
		<div>
			<h3>{daily.track} | {daily.title}</h3>
			<span>Astral Reward: {daily.acclaim}</span>
			<p>Progress:
				<DailyComplete current={daily.progress_current} complete={daily.progress_complete} />
			</p>
		</div>
	)
}
			

export default function Page() {
	const url = base + "wizardsvault/daily"+"?access_token="+API_KEY;
	const { data, error, isLoading } = useSWR(url, fetcher);

	if (error) return <div>failed to load</div>
	if (isLoading) return <div>loading...</div>
	

	return (
		<div>
			<h1>Welcome to the wizard vault!!!</h1>
			{data.meta_progress_current} / {data.meta_progress_complete}
			<ul>
			{data.objectives.map( objective => (<li key={objective.id}><Daily daily={objective} /></li>))}
			</ul>
		</div>
	)
}
