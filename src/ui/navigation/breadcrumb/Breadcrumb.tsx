import Link from 'next/link';
import { styled } from '@mui/material/styles';
import { Paper, Breadcrumbs as MuiBreadcrumbs } from '@mui/material';

const BreadcrumbContainer = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(1, 2),
	backgroundColor: 'inherit',
	'& .MuiBreadcrumbs-li': {
		fontSize: '0.75em',
	},
	a: {
		color: theme.palette.primary.main,
	},
}));

export interface BreadcrumbItem {
	title: string;
	link?: string;
}

export type BreadcrumbProps = {
	separator?: string;
	items: BreadcrumbItem[];
};

const Breadcrumb = (props: BreadcrumbProps) => {
	const { separator = '/', items } = props;
	return (
		<BreadcrumbContainer elevation={0}>
			<MuiBreadcrumbs separator={separator} aria-label="breadcrumb">
				{items.map((item, index) =>
					item.link ? (
						<Link key={`breadItem_${index}`} href={item.link}>
							<a>{item.title}</a>
						</Link>
					) : (
						<span key={`breadItem_${index}`}>{item.title}</span>
					)
				)}
			</MuiBreadcrumbs>
		</BreadcrumbContainer>
	);
};

export default Breadcrumb;
