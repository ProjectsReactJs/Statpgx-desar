const options: Intl.DateTimeFormatOptions = {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
	hour: '2-digit',
	minute: '2-digit',
};

export const dataFmt = new Intl.DateTimeFormat('en-US', options);
