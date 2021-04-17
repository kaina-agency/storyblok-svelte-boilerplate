<script>
	import { onMount } from 'svelte'
	import autosize from 'autosize'
	import { editable } from './utils'
	export let blok
	let cBox = []

	function fieldName(b) {
		return b.type === 'email'
			? 'email'
			: b.field_name.toLowerCase().replace(' ', ' ')
	}

	function phoneMask(e) {
		if (e.target.value && e.inputType !== 'deleteContentBackward') {
			let numbers = e.target.value.match(/[0-9]+/g)
			if (numbers) {
				numbers = numbers.join('')
				numbers =
					numbers.charAt(0) === '0' || numbers.charAt(0) === '1'
						? numbers.substring(1)
						: numbers
				let first =
					numbers.length >= 3
						? '(' + numbers.substr(0, 3) + ') '
						: '(' + numbers.substr(0, 3)
				let second = numbers.substr(3, 3)
				let third = numbers.length > 6 ? '-' + numbers.substr(6, 4) : ''
				e.target.value = `${first}${second}${third}`.substr(0, 14)
			} else {
				e.target.value = numbers || ''
			}
		}
	}

	onMount(() => {
		if (blok.type === 'textarea') {
			autosize(document.getElementById('b-' + blok._uid))
		}
	})
</script>

<div class="form-field" use:editable={blok}>
	{#if ['checkbox', 'switch'].includes(blok.type)}
		<div class="option-label">{blok.field_name}</div>
		{#each blok.options.split('\n') as option, n}
			<label for="b-{blok._uid + n}" class="option">
				<input
					class={blok.type === 'switch' ? 'switch' : ''}
					id="b-{blok._uid + n}"
					type="checkbox"
					value={option}
					bind:group={cBox}
				/>
				{option}
			</label>
		{/each}
		<input
			name={fieldName(blok)}
			required={blok.required}
			class="sr-only"
			aria-hidden
			value={cBox.join(', ')}
		/>
	{:else if blok.type === 'radio'}
		<div class="option-label">{blok.field_name}</div>
		{#each blok.options.split('\n') as option, n}
			<label for="b-{blok._uid + n}" class="option">
				<input
					id="b-{blok._uid + n}"
					name={fieldName(blok)}
					type="radio"
					value={option}
				/>
				{option}
			</label>
		{/each}
	{:else}
		<fieldset
			class={blok.type}
			onclick="this.querySelector('.dynamic').focus();"
		>
			{#if blok.type === 'textarea'}
				<textarea
					class="dynamic"
					id="b-{blok._uid}"
					name={fieldName(blok)}
					placeholder={blok.field_name}
					required={blok.required}
					rows="4"
				/>
			{:else if blok.type === 'select'}
				<select
					class="dynamic"
					id="b-{blok._uid}"
					name={fieldName(blok)}
					required={blok.required}
				>
					{#each blok.options.split('\n') as option}
						<option>{option}</option>
					{/each}
				</select>
			{:else}
				<input
					class="dynamic"
					id="b-{blok._uid}"
					name={fieldName(blok)}
					pattern={blok.type === 'tel'
						? '(?:\\(\\d{3}\\)|\\d{3})[- ]?\\d{3}[- ]?\\d{4}'
						: undefined}
					placeholder={blok.field_name}
					required={blok.required}
					type={blok.type}
					on:input={blok.type === 'tel' ? phoneMask : undefined}
				/>
			{/if}
			<legend>
				<label for="b-{blok._uid}">
					<span class="label">{blok.field_name}</span>
					<svg
						class="valid"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<path
							d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"
						/>
					</svg>
					<svg
						class="invalid"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<path
							d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z"
						/>
					</svg>
					<span class="error-message">{blok.error_message}</span>
				</label>
			</legend>
			<div class="icon" aria-hidden="true">
				{@html blok.icon}
			</div>
		</fieldset>
	{/if}
</div>
