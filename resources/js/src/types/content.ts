const content = {
    global: {
        app_name: "Master ART 64",
        company_name: "Master ART 64",
        company_logo: "/images/20200217_014932-removebg-preview-black.png",
        logo: {
            light: "/images/20200217_014932-removebg-preview.png",
            dark: "/images/20200217_014932-removebg-preview-black.png",
        },
    },
    pages: {
        fr: {
            general: {
                date: "Date",
                time: "Time",
                home: "Home",
                days: [
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                ],
                months: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                ],
            },
            components: {
                form: {
                    save: "Save",
                    save_add: "Save & Add",
                    selected_file: "File selected",
                    active: "Active",
                    inactive: "Inactive",
                    check: "Check",
                },
                list: {
                    action: "Action",
                    all: "All",
                    first: "First",
                    last: "Last",
                    loading: "Loading",
                    print: "Print",
                    pdf: "PDF",
                    csv: "CSV",
                    excel: "Excel",
                    search: "Search",
                    see: "See",
                    show: "Show",
                    sl: "SL",
                    showing: "Showing",
                    from: "from",
                    entries: { singular: "entry", plural: "entries" },
                },
                post: { read_more: "Read more" },
                product: { fcfa: "FCFA" },
            },
            auth: {
                admin: {
                    login: {
                        sign_in_to: "Sign In to",
                        sign_in: "Sign In",
                        admin_panel: "Admin Panel",
                        email_address: "E-mail address",
                        password: "Password",
                        sms: "SMS",
                        email: "E-mail",
                        otp_method: "OTP Method",
                    },
                    verify: {
                        enter: "Enter",
                        verification_code: "Verification code",
                        continue: "Continue",
                        didnt_receive_code: "Didn't receive code",
                        resend: "Resend",
                    },
                },
                footer: {
                    copyright: "Copyright",
                    all_rights: "All rights reserved by",
                },
                user: {
                    login: {
                        dont_be_late: "Welcome",
                        get_in: "Get In",
                        sign_in: "Sign In",
                        email_address: "E-mail address",
                        password: "Password",
                    },
                },
            },
            messages: {
                auth: {
                    admin: {
                        not_found:
                            "These credentials do not match our records.",
                        invalid: "Verification code is invalid.",
                        sent: "Verification code successfully sent.",
                    },
                    user: {
                        inactive:
                            "Your account is not active. Please, contact the administrator.",
                        unauthorized: "Unauthorized",
                        sent: "Reset password link successfully sent.",
                        reset: "Your password has been successfully reset.",
                        failure: "Failure.",
                    },
                },
                admins: {
                    not_found: "Admin not found.",
                    created: "Admin successfully created.",
                    updated: "Admin successfully updated.",
                    deleted: "Admin successfully deleted.",
                },
                users: {
                    not_found: "User not found.",
                    created: "User successfully created.",
                    updated: "User successfully updated.",
                    deleted: "User successfully deleted.",
                },
                roles: {
                    not_found: "Role not found.",
                    created: "Role successfully created.",
                    updated: "Role successfully updated.",
                    deleted: "Role successfully deleted.",
                },
                features: {
                    not_found: "Feature not found.",
                    created: "Feature successfully created.",
                    updated: "Feature successfully updated.",
                    deleted: "Feature successfully deleted.",
                },
                languages: {
                    not_found: "Language not found.",
                    created: "Language successfully created.",
                    updated: "Language successfully updated.",
                    deleted: "Language successfully deleted.",
                },
                notifications: { not_found: "Notification not found." },
                cms: {
                    not_found: "Content not found.",
                    updated: "Content successfully updated.",
                },
                settings: {
                    password: "Incorrect password.",
                    not_found: "Setting not found.",
                    created: "Setting successfully created.",
                    updated: "Setting successfully updated.",
                    deleted: "Setting successfully deleted.",
                },
                methods: {
                    not_found: "Method not found.",
                    created: "Method successfully created.",
                    updated: "Method successfully updated.",
                    deleted: "Method successfully deleted.",
                },
                post_categories: {
                    not_found: "Post category not found.",
                    created: "Post category succesfully created.",
                    updated: "Post category successfully updated.",
                    deleted: "Post category successfully deleted.",
                },
                posts: {
                    not_found: "Post not found.",
                    created: "Post succesfully created.",
                    updated: "Post successfully updated.",
                    deleted: "Post successfully deleted.",
                },
                brands: {
                    not_found: "Brand not found.",
                    created: "Brand succesfully created.",
                    updated: "Brand successfully updated.",
                    deleted: "Brand successfully deleted.",
                },
                products: {
                    not_found: "Product not found.",
                    created: "Product succesfully created.",
                    updated: "Product successfully updated.",
                    deleted: "Product successfully deleted.",
                },
            },
            backend: {
                header: {
                    sign_out: "Sign out",
                    no_message: "No message",
                    no_notification: "No notification",
                    logout: "Logout",
                    close: "Close",
                    sure_logout: "Are you sure you want to logout",
                    you_have: "You have",
                    messages: "messages",
                    view_all_messages: "View all messages",
                    unread_notification: "unread notification",
                    unread_notifications: "unread notifications",
                    view_all_notifications: "View all notifications",
                    notifications: "notifications",
                },
                footer: {
                    copyright: "Copyright",
                    all_rights: "All rights reserved by",
                },
                sidebar: {
                    admin: "Administrator",
                    user: "User",
                    menu: {
                        dashboard: "Dashboard",
                        admins: {
                            title: "Admins",
                            add: "Add admin",
                            index: "Admin list",
                        },
                        users: {
                            title: "Users",
                            add: "Add user",
                            index: "User list",
                        },
                        roles: {
                            title: "Roles",
                            add: "Add role",
                            index: "Role list",
                        },
                        features: {
                            title: "Features",
                            add: "Add feature",
                            index: "Feature list",
                        },
                        languages: {
                            title: "Languages",
                            add: "Add language",
                            index: "Language list",
                        },
                        cms: {
                            title: "CMS",
                            global: "Global",
                            general: "General",
                            components: "Components",
                            auth: "Auth",
                            messages: "Messages",
                            backend: "Backend",
                            frontend: "Frontend",
                        },
                        notifications: "Notifications",
                        settings: {
                            title: "Settings",
                            cms: "CMS",
                            language: "Language settings",
                        },
                        methods: {
                            title: "Methods",
                            add: "Add method",
                            index: "Method list",
                        },
                        post_categories: {
                            title: "Post categories",
                            add: "Add post category",
                            index: "Post category list",
                        },
                        posts: {
                            title: "Posts",
                            add: "Add post",
                            index: "Post list",
                        },
                        brands: {
                            title: "Brands",
                            add: "Add brand",
                            index: "Brand list",
                        },
                        products: {
                            title: "Products",
                            add: "Add product",
                            index: "Product list",
                        },
                    },
                },
                pages: {
                    dashboard: {
                        admin: {
                            title: "Admin panel",
                            subtitle: "Dashboard",
                            blocks: {
                                total_restaurants: "Total Restaurants",
                                total_plans: "Total Plans",
                                total_plans_amount: "Total Plans Amount",
                                total_recharges: "Total Recharges Amount",
                            },
                        },
                        user: {
                            title: "User panel",
                            subtitle: "Dashboard",
                            blocks: {
                                total_restaurants: "Total Restaurants",
                                total_plans: "Total Plans",
                                total_plans_amount: "Total Plans Amount",
                                total_recharges: "Total Recharges Amount",
                            },
                        },
                    },
                    cms: {
                        title: "CMS",
                        global: "Global",
                        general: "General",
                        messages: "Messages",
                        frontend: "Frontend",
                        components: "Components",
                        backend: "Backend",
                        auth: "Auth",
                        form: {
                            logo: "Logo",
                            app_name: "App name",
                            company_name: "Company name",
                        },
                    },
                    admins: {
                        title: "Administrators",
                        add: "Add admin",
                        edit: "Edit admin",
                        index: "Admin list",
                        form: {
                            name: "Admin name",
                            full_name: "Full name",
                            phone: "Phone number",
                            password: "Password",
                            password_confirmation: "Confirm password",
                            email: "E-mail address",
                            admin_photo: "Admin photo",
                            user_photo: "User photo",
                            photo: "Photo",
                            upload: "Upload",
                            size: "Size",
                        },
                    },
                    users: {
                        title: "Users",
                        add: "Add user",
                        edit: "Edit user",
                        index: "User list",
                        form: {
                            name: "User name",
                            full_name: "Full name",
                            phone: "Phone number",
                            password: "Password",
                            password_confirmation: "Confirm password",
                            email: "E-mail address",
                            role: "Role",
                            select_role: "Select role",
                            user_photo: "User photo",
                            photo: "Photo",
                            upload: "Upload",
                            size: "Size",
                        },
                    },
                    roles: {
                        title: "Roles",
                        add: "Add role",
                        edit: "Edit role",
                        index: "Role list",
                        form: {
                            name: "Name",
                            description: "Description",
                            features: "Features",
                            created_at: "Created at",
                            create: "Create",
                            update: "Update",
                            delete: "Delete",
                        },
                    },
                    features: {
                        title: "Features",
                        add: "Add feature",
                        edit: "Edit feature",
                        index: "Feature list",
                        form: {
                            name: "Name",
                            prefix: "Prefix",
                            created_at: "Created at",
                        },
                    },
                    languages: {
                        title: "Languages",
                        add: "Add language",
                        edit: "Edit language",
                        index: "Language list",
                        form: {
                            name: "Name",
                            abbr: "Abbreviation",
                            flag: "Flag",
                            select_flag: "Select flag",
                            created_at: "Created at",
                        },
                    },
                    notifications: {
                        title: "Notifications",
                        show: "Notification details",
                        index: "Notification list",
                        form: {
                            you_have_no_notification:
                                "You have no notification.",
                        },
                    },
                    settings: {
                        title: "Settings",
                        language: {
                            title: "Language settings",
                            form: { select_language: "Select a language" },
                        },
                    },
                    methods: {
                        title: "Methods",
                        add: "Add method",
                        edit: "Edit method",
                        index: "Method list",
                        form: {
                            name: "Method name",
                            text: "Method description",
                            select_status: "Select status",
                            is_active: "Status",
                            created_at: "Created at",
                        },
                    },
                    post_categories: {
                        title: "Post Categories",
                        add: "Add post category",
                        edit: "Edit post category",
                        index: "Post category list",
                        form: {
                            name: "Post category's name",
                            slug: "Slug",
                            is_active: "Status",
                            select_status: 'Select status',
                            created_at: "Created at",
                        },
                    },
                    posts: {
                        title: "Posts",
                        add: "Add post",
                        edit: "Edit post",
                        index: "Post list",
                        form: {
                            title: "Post's Title",
                            body: "Post's Body",
                            photo: "Post's Photo",
                            post_category: "Post Category",
                            post_photo: "Post photo",
                            select_status: "Select status",
                            is_active: "Status",
                            slug: "Slug",
                            select_post_category: "Select post category",
                            upload: "Upload",
                            size: "Size",
                            created_at: "Created at",
                        },
                    },
                    brands: {
                        title: "Brands",
                        add: "Add brand",
                        edit: "Edit brand",
                        index: "Brand list",
                        form: {
                            name: "Brand's name",
                            created_at: "Created at",
                        },
                    },
                    products: {
                        title: "Products",
                        add: "Add product",
                        edit: "Edit product",
                        index: "Product list",
                        form: {
                            name: "Product's Name",
                            description: "Product's Description",
                            photo: "Product's Photo",
                            price: "Product's Price",
                            product_photo: "Product photo",
                            brand: "Brand",
                            select_status: "Select status",
                            is_active: "Status",
                            slug: "Slug",
                            select_brand: "Select brand",
                            upload: "Upload",
                            size: "Size",
                            created_at: "Created at",
                        },
                    },
                },
            },
            frontend: {
                header: {
                    menu: {
                        home: "Accueil",
                        about: "A propos",
                        courses: "Cours",
                        products: "Produits",
                        posts: "Blog",
                        contact: "Contact",
                    },
                },
                footer: {
                    top: {
                        address: {
                            title: "Adresse",
                            cm: "Douala - Cameroun\r\nAkwa, Camp Yassa",
                            fr: "78 Route du Rhin\r\n67400 Illkirch Graffenstaden",
                        },
                        phone_email: {
                            title: "T\u00e9l\u00e9phone & Email",
                            phone: {
                                label: "T\u00e9l\u00e9phone",
                                value: [
                                    "(+237) 656 395 217",
                                    "(+33) 769 570 133",
                                ],
                            },
                            email: {
                                label: "Email",
                                value: ["contact@themasterofarts.com"],
                            },
                        },
                        newsletter: {
                            title: "Souscrire \u00e0 notre Newsletter",
                            form: {
                                email: "E-mail address",
                                submit: "Envoyer",
                            },
                        },
                        partners: {
                            title: "Nos partenaires",
                            body: [
                                "/images/20200217_014932-removebg-preview.png",
                                "/images/cropped-cropped-TekZone-Logo-Transparent.png",
                            ],
                        },
                        facebook_likes: { title: "Likes Facebook" },
                    },
                    bottom: {
                        all_rights_reserved: "Tous droits r\u00e9serv\u00e9s",
                        social_networks: {
                            facebook: "//www.facebook.com/Themasterofarts",
                            linkedin: "//www.linkedin.com/company/ma64",
                            youtube:
                                "//www.youtube.com/channel/UCcS0kG75hsf3Rt0-sYyG-0A/",
                            instagram: "//www.instagram.com/masterart_64/",
                            whatsapp:
                                "//api.whatsapp.com/send?phone=+237%20656395217",
                        },
                    },
                },
                pages: {
                    home: {
                        banner: {
                            carousel: [
                                { src: "/images/Layer_4_copy.png" },
                                {
                                    src: "/images/482f2140-4473-42e8-85d2-0953eaf84d88.png",
                                },
                                { src: "/images/onlinestudents.png" },
                            ],
                            body: {
                                title: "Obtenir vos kits et accessoires High Tech",
                                description:
                                    "Des kits d'education, l'\u00e9lectronique pour vos projets , des formations certifiantes et du financement participatif.",
                                ask_price: "Demander le prix",
                                crowdfunding: "Crowdfunding",
                            },
                        },
                        features: {
                            from_air: "From air",
                            best_drones: "Best drones",
                            speed: "Speed",
                            long_range: "Long range",
                            ask_price: "Demander le prix",
                        },
                        qualification_assistance: {
                            title: "Assistance \u00e0 la Qualification",
                            description:
                                "R\u00e9ussissez votre projet d'\u00e9tudes en IA, Robotique, Data Science gr\u00e2ce \u00e0 des programmes en ligne.",
                            points: [
                                "La jeunesse de la francophonie vise les hautes ing\u00e9nieries.",
                                "Un int\u00e9r\u00eat croissant pour les m\u00e9tiers informatiques depuis la crise du Covid.",
                                "En cycle Licence, beaucoup aspirent \u00e0 des sp\u00e9cialisations.",
                                "Themasterofarts offre des tutoriels, du mat\u00e9riel, expertise et t\u00e9l\u00e9-expertise pour l'innovation.",
                                "Nous offrons des programmes garantissant des bourses, l'acc\u00e8s \u00e0 des Master d'\u00e9lite.",
                                "Nos partenariats rendent l'innovation possible aux jeunes entrepreneurs.",
                            ],
                            img: "/images/computer.png",
                        },
                        products: {
                            title: "Nos produits",
                            description:
                                "S\u00e9lectionnez le produit qui vous int\u00e9resse et vous recevrez les instructions de paiement et livraison sur WhatsApp.",
                        },
                        squares: {
                            education_kits: {
                                title: "Des kits d'\u00e9ducation",
                                description:
                                    "Fournissez vous en mat\u00e9riel d'\u00e9ducation pour vos projets, Nos kits d'education adapt\u00e9s pour des prototypages de drones modulaires (a\u00e9riens, sous-marins, mobiles)",
                                ask_price: "Demander le prix",
                                img: "/images/photo_2021-08-07_21-08-43.jpg",
                            },
                            online_workshops: {
                                title: "Ateliers en ligne",
                                description:
                                    "Formez vous depuis chez vous chaque weekend de mani\u00e8re acc\u00e9ler\u00e9e avec vos kits de mani\u00e8re personnalis\u00e9e et a la demande",
                                ask_price: "Demander le prix",
                                img: "/images/photo_2021-08-07_21-06-47.jpg",
                            },
                        },
                        blog: {
                            title: "Notre blog",
                            description:
                                "Retrouvez les derni\u00e8res nouvelles et actualit\u00e9s du domaine qui est le n\u00f4tre.",
                        },
                    },
                    products: {
                        banner: { title: "Produits" },
                        form: {
                            go: "Aller",
                            reset: "R\u00e9initialiser",
                            sort_product_by: "Trier les produits par",
                            filter_by_price: "Filtrer par prix",
                            filter_by_brands: "Filtrer par marque",
                        },
                    },
                    posts: {
                        banner: { title: "Blog" },
                        body: {
                            sidebar: {
                                search: {
                                    title: "RECHERCHER",
                                    form: { search: "Rechercher" },
                                },
                                popular_posts: { title: "ARTICLES POPULAIRES" },
                            },
                            main: {
                                written_by: "\u00c9crit par",
                                read_more: "Read more",
                            },
                        },
                    },
                },
            },
        },
    },
};

export type Cms = typeof content & {
    auth: typeof content.pages.fr.auth;
    backend: typeof content.pages.fr.backend;
    components: typeof content.pages.fr.components;
    general: typeof content.pages.fr.general;
    messages: typeof content.pages.fr.messages;
    frontend: typeof content.pages.fr.frontend;
};

export type Content = {
    cms: {
        global: typeof content.global;
        pages: typeof content.pages.fr;
    };
    currencies: [];
    countries: { country: string; code: string; name: string }[];
};
