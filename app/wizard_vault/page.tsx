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
	const url = base + "wizardsvault/daily"+"?access_token="+API_KEY;
	const { data, error, isLoading } = useSWR(url, fetcher);

	if (error) return <div>failed to load</div>
	if (isLoading) return <div>loading...</div>
	

	return (
		<div>
			<h1>Welcome to the wizard vault!!!</h1>
			<DailyCollection dailies={data} />
		</div>
	)
}
