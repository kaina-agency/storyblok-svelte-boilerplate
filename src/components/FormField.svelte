<script>
	import { editable } from './utils'
	export let blok
	let cBox = []

	function fieldName(b) {
		return b.type === 'email'
			? 'email'
			: b.field_name.toLowerCase().replace(' ', ' ')
	}

	function classes(b) {
		let classes = []
		if (b.icon) classes.push('has-icon')
		if (b.type === 'textarea') classes.push('grow-wrap')
		return classes.join(' ')
	}

	function phoneMask(e) {
		if (blok.type === 'tel') {
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
	}
</script>

<div class="form-field" use:editable={blok}>
	{#if ['checkbox', 'switch'].includes(blok.type)}
		<label class="option-label">{blok.field_name}</label>
		{#each blok.options.split('\n') as option}
			<label class="option">
				<input
					type="checkbox"
					class={blok.type === 'switch' ? 'switch' : ''}
					bind:group={cBox}
					value={option}
				/>
				{option}
			</label>
		{/each}
		<input name={fieldName(blok)} type="hidden" value={cBox.join(', ')} />
	{:else if blok.type === 'radio'}
		<label class="option-label">{blok.field_name}</label>
		{#each blok.options.split('\n') as option}
			<label class="option">
				<input type="radio" name={fieldName(blok)} value={option} />
				{option}
			</label>
		{/each}
	{:else}
		<div class="text-field-wrapper {classes(blok)}">
			{#if blok.type === 'textarea'}
				<textarea
					name={fieldName(blok)}
					placeholder={blok.field_name}
					aria-placeholder={blok.field_name}
					required={blok.required}
					class={blok.icon ? 'has-icon' : ''}
					onInput="this.parentNode.dataset.replicatedValue = this.value"
				/>
			{:else if blok.type === 'select'}
				<select name={fieldName(blok)} required={blok.required}>
					<option value="" disabled selected>{blok.field_name}</option>
					{#each blok.options.split('\n') as option}
						<option>{option}</option>
					{/each}
				</select>
			{:else}
				<input
					type={blok.type}
					name={fieldName(blok)}
					pattern={blok.type === 'tel'
						? '\\([0-9]{3}\\) [0-9]{3}-[0-9]{4}'
						: undefined}
					placeholder={blok.field_name}
					ariaplaceholder={blok.field_name}
					required={blok.required}
					on:input={phoneMask}
					on:change={phoneMask}
				/>
			{/if}
			<span class="error-message">{blok.error_message}</span>
			<div class="icon">{@html blok.icon}</div>
			{#if blok.type === 'select'}
				<div class="arrow">
					<svg width="24" height="24" viewBox="0 0 24 24">
						<path
							d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
						/>
					</svg>
				</div>
			{/if}
		</div>
	{/if}
</div>
