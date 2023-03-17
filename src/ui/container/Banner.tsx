import { Card, CardMedia, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

export type Item = {
	Name: string;
	Caption: string;
	Items: { Name: string; Image: string }[];
};

export interface BannerProps {
	item: Item;
}

const BannerCard = styled(Card)(() => ({
	height: '400px',
	position: 'relative',
}));

const BannerGrid = styled(Grid)(() => ({
	height: '100%',
	position: 'relative',
}));

const MediaCaption = styled(Typography)(() => ({
	textOverflow: 'ellipsis',
	position: 'absolute',
	bottom: '0',
	padding: '15px',
	backgroundColor: '#000',
	color: '#fff',
	opacity: '0.6',
	width: '100%',
	fontSize: '21px',
	transition: '300ms',
	cursor: 'pointer',
	'&:hover': {
		opacity: '0.8',
	},
}));

const BannerMedia = styled(CardMedia)(() => ({
	backgroundColor: '#fff',
	height: '100%',
	overflow: 'hidden',
	position: 'relative',
	transition: '300ms',
	cursor: 'pointer',
	'&:hover': {
		filter: 'brightness(115%)',
	},
}));

const Banner = (props: BannerProps) => {
	const { item } = props;

	let items = [];

	for (let i = 0; i < item.Items.length; i++) {
		const currentItem = item.Items[i];

		const media = (
			<Grid item xs={12 / item.Items.length} key={currentItem.Name}>
				<BannerMedia image={currentItem.Image} title={currentItem.Name}>
					<MediaCaption>{currentItem.Name}</MediaCaption>
				</BannerMedia>
			</Grid>
		);

		items.push(media);
	}

	return (
		<BannerCard raised>
			<BannerGrid container spacing={0}>
				{items}
			</BannerGrid>
		</BannerCard>
	);
};

export default Banner;
