<script>
	export let config;
</script>

<div class="card">
	<div class="text">{config.text}</div>
	<button>
		Upgrade to 1
	</button>
</div>
<style>
	.card{
		background: grey;
		width: 20vw;
		padding: 10px;
		margin: 10px;
		border-radius: 5px;
		pointer-events: all;
		min-height: 200px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.text {
		background: #a50505;
		border-radius: 3px;
		font-size: 17px;
		min-height: 100px;
		align-content: center;
		flex-direction: column;
		justify-content: center;
		display: flex;
		vertical-align: middle;
	}
</style>

