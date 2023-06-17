import { setAuthKey, getAddr } from "knn3-sdk";
import { launchChromium } from "playwright-aws-lambda";
import uploadToImgBB from "@/control/uploadToImgBB";

setAuthKey("knn3-common-AswT-mcYf");

export const renderImage = async (address: string): Promise<string> => {
	const browser = await launchChromium();
	const page = await browser.newPage();
	// const addr = await getAddr(address);

	await page.setViewportSize({ width: 500, height: 500 });
	await page.setContent(`
   <!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>KNN3</title>
	</head>
	<body
		style="
			background: url(https://static.wixstatic.com/media/0f998e_c0d2e2a6b408474c840ae228cdf5faecf000.jpg);
			background-position: center center;
			background-size: contain;
			width:100%;
			height:100%;
		"
	>
		<div
			style="
				width:100%;
				height:100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				color: white;
				font-size: 14px;
			"
		>
			<h5 style="margin-bottom: 30px">-> ${address}</h5>
			<div style="display: flex; width: 100%; justify-content: space-around;">
				<div style="display: flex; width:300px; flex-direction: column;  padding-left: 30px;">
				 	<span style="font-weight: 500; padding-bottom: 20px; font-size: 16px;">Profile</span>
					<div style="display: flex; align-items: center;">
						<img width="25px" style="margin-left: -3px;" src="https://knn3-images.s3.us-west-2.amazonaws.com/twitter.png"/> 
						<span style="margin-left: 5px;">988064388702650370</span>
					</div>
					<div style="display: flex; align-items: center; margin-top: 10px;">
						<img width="20px" src="https://aui.atlassian.com/aui/8.8/docs/images/avatar-person.svg"/> 
						<span style="margin-left: 5px;">shadow88sky</span>
					</div>
					<div style="display: flex; align-items: center; margin-top: 10px;">
						<img width="27px" style="margin-left: -3px;" src="https://chat.ens.domains/static/ENSLogo.svg"/> 
						<span style="margin-left: 5px;">shadow88sky.eth</span>
					</div>
					<div style="display: flex; align-items: center; margin-top: 10px;">
						<img width="20px" src="https://knn3-images.s3.us-west-2.amazonaws.com/logo.svg"/> 
						<span style="margin-left: 5px;">shadow88sky</span>
					</div>
				 <div style="display: flex; align-items: center; margin-top: 10px;">
						<img width="32px" style="margin-left: -6px;" src="https://www.freepnglogos.com/uploads/email-png/email-western-libraries-12.png"/> 
						<span style="margin-left: 5px;">wen.he@knn3.xyz</span>
					</div>
					
				</div>
				<div style="display: flex; width:300px; flex-direction: column;white-space: nowrap; ">
					<span style="font-weight: 500; padding-bottom: 20px;font-size: 16px;">Activity (ethereum)</span>
					<span>Poap: [dappcon 2019], ethberlin</span>
					<span style=" margin-top: 10px;">Hold NFT: 1</span>
					<span style=" margin-top: 10px;">Hold token: [Bankless Token, Aave Token, ]</span>
					<span style=" margin-top: 10px;">SpaceId: [hadow88sky.bnb, Aave Token, ]</span>
					<span style=" margin-top: 10px;">Vote: more then 3 times</span>
				</div>
			</div>
			<div style="margin-top: 25px; display: flex; align-items: center;">
				  <img height="50px" src="https://imusae-static.90sheji.com/imusae/static/2020/12/05/abed703c848cc9735165dac0befd20a4.png?imageMogr2/thumbnail/324x/crop/!x476-10a0/auto-orient/interlace/1/quality/85/format/webp"/>
					<H1>Heat value: 30</H1>
				</div>
			<div style="display:flex; width:95%; justify-content: space-between; position: absolute; bottom:10px ; color: white; align-items: center;"> 
				<img height="15px" src="https://static.wixstatic.com/media/0f998e_7ea545ad9b85433ab16e57869a8be59b~mv2.png"></p>
				<p style="font-size: 12px;">©2022 by KNN3 Network.</p>
			</div>
		</div>
	</body>
</html>
  `);

	const screenshotBuffer = await page.screenshot({ type: "png" });

	const imageUrl = await uploadToImgBB(screenshotBuffer);

	return imageUrl;
};
