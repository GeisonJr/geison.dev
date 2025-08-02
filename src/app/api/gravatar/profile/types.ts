export interface GravatarVerifiedAccount {
	service_type: string
	service_label: string
	service_icon: string
	url: string
	is_hidden: boolean
}

export interface GravatarLanguage {
	code: string
	name: string
	is_primary: boolean
	order: number
}

export interface GravatarLink {
	label: string
	url: string
}

export interface GravatarInterest {
	id: number
	name: string
}

export interface GravatarPaymentLink {
	label: string
	url: string
}

export interface GravatarPaymentCryptoWallet {
	label: string
	address: string
}

export interface GravatarGallery {
	url: string
	alt_text: string
}

export interface GravatarData {
	hash: string
	display_name: string
	profile_url: string
	avatar_url: string
	avatar_alt_text: string
	location: string
	description: string
	job_title: string
	company: string
	verified_accounts: GravatarVerifiedAccount[]
	pronunciation: string
	pronouns: string
	timezone: string
	languages: GravatarLanguage[]
	first_name: string
	last_name: string
	is_organization: boolean
	background_color: string
	links: GravatarLink[]
	interests: GravatarInterest[]
	payments: {
		links: GravatarPaymentLink[]
		crypto_wallets: GravatarPaymentCryptoWallet[]
	}
	contact_info: {
		home_phone: string
		work_phone: string
		cell_phone: string
		email: string
		contact_form: string
		calendar: string
	}
	gallery: GravatarGallery[]
	number_verified_accounts: number
	last_profile_edit: string
	registration_date: string
}

export interface Account {
	label: string
	url: string
	type: string
	image_url: string
}

export interface Language {
	label: string
}

export interface Link {
	label: string
	url: string
}

export interface Data {
	first_name: string
	last_name: string
	display_name: string
	pronunciation: string
	pronouns: string
	avatar_url: string
	profile_url: string
	description: string
	location: string
	accounts: Account[]
	languages: Language[]
	links: Link[]
}
