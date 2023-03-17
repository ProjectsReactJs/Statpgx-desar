import * as React from 'react';
import { Box, Avatar, Badge, CircularProgress } from '@mui/material';
import { styled, lighten, rgbToHex } from '@mui/material/styles';

const SmallAvatar = styled(Avatar)(({ theme }) => ({
	width: 20,
	height: 20,
	border: `2px solid ${theme.palette.background.paper}`,
}));

export type CircularProgressWithContentProps = {
	badgeIcon: React.ReactNode;
	avatarIcon: React.ReactNode;
	value: number;
	color: string;
	isCompleted?: boolean;
	state: ProgressState;
};

export enum ProgressState {
	First,
	Second,
	Third,
	Fourth,
}

export const PROGRESS_COLORS = {
	[ProgressState.First]: '#FF595C',
	[ProgressState.Second]: '#FF9F35',
	[ProgressState.Third]: '#FFC649',
	[ProgressState.Fourth]: '#55BD45',
};

const getProgressBarColor = (value: number) => {
	if (value >= 0 && value <= 24) {
		return PROGRESS_COLORS[ProgressState.First];
	} else if (value >= 25 && value <= 49) {
		return PROGRESS_COLORS[ProgressState.Second];
	} else if (value >= 50 && value <= 74) {
		return PROGRESS_COLORS[ProgressState.Third];
	} else {
		return PROGRESS_COLORS[ProgressState.Fourth];
	}
};

const CircularProgressWithContent: React.FC<CircularProgressWithContentProps> = (props) => {
	const { avatarIcon, color, badgeIcon, value, isCompleted } = props;
	const progressBarColor = getProgressBarColor(value);

	return (
		<Box sx={{ my: 2.5, mr: 1.5, ml: 1.5, position: 'relative' }}>
			<Box>
				<Badge
					overlap="circular"
					anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
					badgeContent={
						<SmallAvatar
							sx={{
								color: isCompleted ? '#F48B29' : '#BCBCBC',
								backgroundColor: isCompleted ? '#FFBF39' : '#E2E2E2',
							}}
						>
							{badgeIcon}
						</SmallAvatar>
					}
				>
					<Avatar sx={{ backgroundColor: `${rgbToHex(lighten(color, 0.5))}`, width: 65, height: 65 }}>{avatarIcon}</Avatar>
				</Badge>
			</Box>
			<CircularProgress
				variant="determinate"
				sx={{
					color: (theme) => theme.palette.grey[300],
					position: 'absolute',
					top: -8,
					left: -8,
					zIndex: 0,
					circle: {
						strokeLinecap: 'round',
					},
				}}
				size={81}
				thickness={3}
				value={100}
			/>
			<CircularProgress
				thickness={3}
				variant="determinate"
				value={value}
				size={81}
				sx={{
					color: progressBarColor,
					transform: 'rotate(90deg) !important',
					position: 'absolute',
					top: -8,
					left: -8,
					zIndex: 0,
					circle: {
						strokeLinecap: 'round',
					},
				}}
			/>
		</Box>
	);
};

export default CircularProgressWithContent;
