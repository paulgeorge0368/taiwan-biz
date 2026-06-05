<template>

	<header>
		<nav>
			<p>公司查詢網</p>
			<div>
				<RouterLink to="/">首頁</RouterLink>
				<RouterLink to="/listed">上市公司</RouterLink>
				<RouterLink to="/otc">上櫃公司</RouterLink>
			</div>
		</nav>
	</header>

	<RouterView />

	<footer>All copyrights reserved © 2026 台灣查詢網</footer>
</template>

<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: sans-serif; background: #f5f5f5; color: #333; }
h1,h2,h3,h4.h5.h6,p,a,li,td,td,span,div{
	font-family: "Noto Sans TC", sans-serif;
	font-optical-sizing: auto;
	font-style: normal;
}
:root{
	--max-width:1000px;
	--section-gap: 80px;
}
header{
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	font-size: 15px;
	z-index: 5;
}
header>nav{
	width: 100%;
	max-width: var(--max-width);
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px;
}
header>nav>div{
	display: flex;
	align-items: center;
	grid-gap:20px;
}
header a{
	font-size: 1.1em;
	font-weight: 500;
	color: white;
	text-decoration: unset !important;
}
header p{
	font-size: 1.5em;
	font-weight: 500;
	color: white;
	text-decoration: unset !important;
}

footer {
  text-align: center;
  padding: 30px 20px;
  font-size: 15px;
  color: white;
  font-weight: 500;
  background-color: #3e3a39;
}
@media (max-width:767px) {
	header a{
		font-size: 14px;
	}
	header p{
		font-size: 20px;
	}
	header>nav>div{
		grid-gap: 15px;
	}
}
@media (max-width:600px) {
	:root{
		--section-gap:40px
	}
}
</style>