import React from 'react';
import { Button as MuiButton, Menu as MuiMenu, MenuItem as MuiMenuItem } from '@mui/material';

export type MenuOptionProps = {
	id: string;
	label: string;
};

export type MenuProps = {
	ariaLabel?: string;
	id: string;
	onSelectOption?: (selectedOption: MenuOptionProps, optionElement?: any) => void;
	options: MenuOptionProps[];
	selectedOption?: MenuOptionProps;
	icon?: React.ReactNode;
	staticLabel?: string;
	optionElement?: any;
};

const Menu = (props: MenuProps) => {
	const { id, ariaLabel, onSelectOption, selectedOption, options, icon, staticLabel, optionElement } = props;
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (option?: MenuOptionProps) => {
		if (option && onSelectOption) {
			onSelectOption(option, optionElement);
		}
		setAnchorEl(null);
	};

	const label = selectedOption ? selectedOption.label : staticLabel;

	return (
		<div>
			<MuiButton
				aria-controls={id}
				aria-label={ariaLabel}
				aria-haspopup="true"
				variant="text"
				title={ariaLabel}
				onClick={handleClick}
				startIcon={icon}
			>
				{label}
			</MuiButton>
			<MuiMenu
				id={id}
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={() => {
					handleClose(selectedOption);
				}}
			>
				{options.map((option, index) => (
					<MuiMenuItem
						key={`${id}-${index}`}
						onClick={() => {
							handleClose(option);
						}}
					>
						{option.label}
					</MuiMenuItem>
				))}
			</MuiMenu>
		</div>
	);
};

export default Menu;
