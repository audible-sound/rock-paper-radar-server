--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4
-- Dumped by pg_dump version 16.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: BannedPosts; Type: TABLE; Schema: public; Owner: zhanjiea
--

CREATE TABLE public."BannedPosts" (
    id integer NOT NULL,
    "reportId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."BannedPosts" OWNER TO zhanjiea;

--
-- Name: BannedPosts_id_seq; Type: SEQUENCE; Schema: public; Owner: zhanjiea
--

CREATE SEQUENCE public."BannedPosts_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."BannedPosts_id_seq" OWNER TO zhanjiea;

--
-- Name: BannedPosts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zhanjiea
--

ALTER SEQUENCE public."BannedPosts_id_seq" OWNED BY public."BannedPosts".id;


--
-- Name: Bans; Type: TABLE; Schema: public; Owner: zhanjiea
--

CREATE TABLE public."Bans" (
    id integer NOT NULL,
    "userID" integer,
    "timestampUnbanned" timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Bans" OWNER TO zhanjiea;

--
-- Name: Bans_id_seq; Type: SEQUENCE; Schema: public; Owner: zhanjiea
--

CREATE SEQUENCE public."Bans_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Bans_id_seq" OWNER TO zhanjiea;

--
-- Name: Bans_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zhanjiea
--

ALTER SEQUENCE public."Bans_id_seq" OWNED BY public."Bans".id;


--
-- Name: BugReports; Type: TABLE; Schema: public; Owner: zhanjiea
--

CREATE TABLE public."BugReports" (
    id integer NOT NULL,
    "userID" integer NOT NULL,
    "userType" character varying(255) NOT NULL,
    "bugContent" character varying(255) NOT NULL,
    "pictureUrl" character varying(255) NOT NULL,
    "bugState" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."BugReports" OWNER TO zhanjiea;

--
-- Name: BugReports_id_seq; Type: SEQUENCE; Schema: public; Owner: zhanjiea
--

CREATE SEQUENCE public."BugReports_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."BugReports_id_seq" OWNER TO zhanjiea;

--
-- Name: BugReports_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zhanjiea
--

ALTER SEQUENCE public."BugReports_id_seq" OWNED BY public."BugReports".id;


--
-- Name: Comments; Type: TABLE; Schema: public; Owner: zhanjiea
--

CREATE TABLE public."Comments" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "postId" integer NOT NULL,
    "commentContent" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Comments" OWNER TO zhanjiea;

--
-- Name: Comments_id_seq; Type: SEQUENCE; Schema: public; Owner: zhanjiea
--

CREATE SEQUENCE public."Comments_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Comments_id_seq" OWNER TO zhanjiea;

--
-- Name: Comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zhanjiea
--

ALTER SEQUENCE public."Comments_id_seq" OWNED BY public."Comments".id;


--
-- Name: MapData; Type: TABLE; Schema: public; Owner: zhanjiea
--

CREATE TABLE public."MapData" (
    id integer NOT NULL,
    "travelID" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."MapData" OWNER TO zhanjiea;

--
-- Name: MapData_id_seq; Type: SEQUENCE; Schema: public; Owner: zhanjiea
--

CREATE SEQUENCE public."MapData_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."MapData_id_seq" OWNER TO zhanjiea;

--
-- Name: MapData_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zhanjiea
--

ALTER SEQUENCE public."MapData_id_seq" OWNED BY public."MapData".id;


--
-- Name: PostTags; Type: TABLE; Schema: public; Owner: zhanjiea
--

CREATE TABLE public."PostTags" (
    name character varying(255) NOT NULL,
    "postId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."PostTags" OWNER TO zhanjiea;

--
-- Name: Posts; Type: TABLE; Schema: public; Owner: zhanjiea
--

CREATE TABLE public."Posts" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "postTitle" character varying(255) NOT NULL,
    "pictureUrl" character varying(255) NOT NULL,
    "postContent" character varying(255) NOT NULL,
    location character varying(255) NOT NULL,
    "postLikes" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Posts" OWNER TO zhanjiea;

--
-- Name: Posts_id_seq; Type: SEQUENCE; Schema: public; Owner: zhanjiea
--

CREATE SEQUENCE public."Posts_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Posts_id_seq" OWNER TO zhanjiea;

--
-- Name: Posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zhanjiea
--

ALTER SEQUENCE public."Posts_id_seq" OWNED BY public."Posts".id;


--
-- Name: ReportComments; Type: TABLE; Schema: public; Owner: zhanjiea
--

CREATE TABLE public."ReportComments" (
    id integer NOT NULL,
    "userId" integer,
    "coomentId" integer NOT NULL,
    "reportState" character varying(255) NOT NULL,
    "reportContent" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."ReportComments" OWNER TO zhanjiea;

--
-- Name: ReportComments_id_seq; Type: SEQUENCE; Schema: public; Owner: zhanjiea
--

CREATE SEQUENCE public."ReportComments_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ReportComments_id_seq" OWNER TO zhanjiea;

--
-- Name: ReportComments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zhanjiea
--

ALTER SEQUENCE public."ReportComments_id_seq" OWNED BY public."ReportComments".id;


--
-- Name: ReportPosts; Type: TABLE; Schema: public; Owner: zhanjiea
--

CREATE TABLE public."ReportPosts" (
    id integer NOT NULL,
    "userId" integer,
    "postId" integer NOT NULL,
    "reportState" character varying(255) NOT NULL,
    "reportContent" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."ReportPosts" OWNER TO zhanjiea;

--
-- Name: ReportPosts_id_seq; Type: SEQUENCE; Schema: public; Owner: zhanjiea
--

CREATE SEQUENCE public."ReportPosts_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ReportPosts_id_seq" OWNER TO zhanjiea;

--
-- Name: ReportPosts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zhanjiea
--

ALTER SEQUENCE public."ReportPosts_id_seq" OWNED BY public."ReportPosts".id;


--
-- Name: Reports; Type: TABLE; Schema: public; Owner: zhanjiea
--

CREATE TABLE public."Reports" (
    id integer NOT NULL,
    "userID" integer,
    "reportType" character varying(255),
    "reportedID" integer,
    "reportState" character varying(255),
    "reportContent" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Reports" OWNER TO zhanjiea;

--
-- Name: Reports_id_seq; Type: SEQUENCE; Schema: public; Owner: zhanjiea
--

CREATE SEQUENCE public."Reports_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Reports_id_seq" OWNER TO zhanjiea;

--
-- Name: Reports_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zhanjiea
--

ALTER SEQUENCE public."Reports_id_seq" OWNED BY public."Reports".id;


--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: zhanjiea
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO zhanjiea;

--
-- Name: TravelPlans; Type: TABLE; Schema: public; Owner: zhanjiea
--

CREATE TABLE public."TravelPlans" (
    id integer NOT NULL,
    "userID" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."TravelPlans" OWNER TO zhanjiea;

--
-- Name: TravelPlans_id_seq; Type: SEQUENCE; Schema: public; Owner: zhanjiea
--

CREATE SEQUENCE public."TravelPlans_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."TravelPlans_id_seq" OWNER TO zhanjiea;

--
-- Name: TravelPlans_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zhanjiea
--

ALTER SEQUENCE public."TravelPlans_id_seq" OWNED BY public."TravelPlans".id;


--
-- Name: UserLikes; Type: TABLE; Schema: public; Owner: zhanjiea
--

CREATE TABLE public."UserLikes" (
    "userId" integer NOT NULL,
    "postId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."UserLikes" OWNER TO zhanjiea;

--
-- Name: UserProfiles; Type: TABLE; Schema: public; Owner: zhanjiea
--

CREATE TABLE public."UserProfiles" (
    id integer NOT NULL,
    "userId" integer,
    "profileDescription" character varying(255) NOT NULL,
    "profilePictureUrl" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."UserProfiles" OWNER TO zhanjiea;

--
-- Name: UserProfiles_id_seq; Type: SEQUENCE; Schema: public; Owner: zhanjiea
--

CREATE SEQUENCE public."UserProfiles_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."UserProfiles_id_seq" OWNER TO zhanjiea;

--
-- Name: UserProfiles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zhanjiea
--

ALTER SEQUENCE public."UserProfiles_id_seq" OWNED BY public."UserProfiles".id;


--
-- Name: Users; Type: TABLE; Schema: public; Owner: zhanjiea
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    "birthDate" timestamp with time zone NOT NULL,
    gender character varying(255) NOT NULL,
    country character varying(255) NOT NULL,
    "phoneNumber" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Users" OWNER TO zhanjiea;

--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: zhanjiea
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Users_id_seq" OWNER TO zhanjiea;

--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zhanjiea
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- Name: blogs; Type: TABLE; Schema: public; Owner: zhanjiea
--

CREATE TABLE public.blogs (
    id integer NOT NULL,
    "staffID" integer NOT NULL,
    "blogTitle" character varying(255) NOT NULL,
    "blogPicture" character varying(255),
    "blogContent" character varying(255) NOT NULL,
    "blogLikes" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.blogs OWNER TO zhanjiea;

--
-- Name: blogs_id_seq; Type: SEQUENCE; Schema: public; Owner: zhanjiea
--

CREATE SEQUENCE public.blogs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.blogs_id_seq OWNER TO zhanjiea;

--
-- Name: blogs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zhanjiea
--

ALTER SEQUENCE public.blogs_id_seq OWNED BY public.blogs.id;


--
-- Name: feedbacks; Type: TABLE; Schema: public; Owner: zhanjiea
--

CREATE TABLE public.feedbacks (
    id integer NOT NULL,
    "userID" integer NOT NULL,
    "userType" character varying(255) NOT NULL,
    "feedbackContent" character varying(255) NOT NULL,
    "pictureUrl" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.feedbacks OWNER TO zhanjiea;

--
-- Name: feedbacks_id_seq; Type: SEQUENCE; Schema: public; Owner: zhanjiea
--

CREATE SEQUENCE public.feedbacks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.feedbacks_id_seq OWNER TO zhanjiea;

--
-- Name: feedbacks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zhanjiea
--

ALTER SEQUENCE public.feedbacks_id_seq OWNED BY public.feedbacks.id;


--
-- Name: staffProfiles; Type: TABLE; Schema: public; Owner: zhanjiea
--

CREATE TABLE public."staffProfiles" (
    id integer NOT NULL,
    "staffID" integer,
    "profileDescription" character varying(255) NOT NULL,
    "pictureUrl" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."staffProfiles" OWNER TO zhanjiea;

--
-- Name: staffProfiles_id_seq; Type: SEQUENCE; Schema: public; Owner: zhanjiea
--

CREATE SEQUENCE public."staffProfiles_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."staffProfiles_id_seq" OWNER TO zhanjiea;

--
-- Name: staffProfiles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zhanjiea
--

ALTER SEQUENCE public."staffProfiles_id_seq" OWNED BY public."staffProfiles".id;


--
-- Name: staffs; Type: TABLE; Schema: public; Owner: zhanjiea
--

CREATE TABLE public.staffs (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "userType" character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    "birthDate" timestamp with time zone NOT NULL,
    gender character varying(255) NOT NULL,
    country character varying(255) NOT NULL,
    "phoneNumber" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.staffs OWNER TO zhanjiea;

--
-- Name: staffs_id_seq; Type: SEQUENCE; Schema: public; Owner: zhanjiea
--

CREATE SEQUENCE public.staffs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.staffs_id_seq OWNER TO zhanjiea;

--
-- Name: staffs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zhanjiea
--

ALTER SEQUENCE public.staffs_id_seq OWNED BY public.staffs.id;


--
-- Name: userGuides; Type: TABLE; Schema: public; Owner: zhanjiea
--

CREATE TABLE public."userGuides" (
    id integer NOT NULL,
    "staffID" integer NOT NULL,
    "forUserType" character varying(255) NOT NULL,
    "pictureUrl" character varying(255) NOT NULL,
    content character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."userGuides" OWNER TO zhanjiea;

--
-- Name: userGuides_id_seq; Type: SEQUENCE; Schema: public; Owner: zhanjiea
--

CREATE SEQUENCE public."userGuides_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."userGuides_id_seq" OWNER TO zhanjiea;

--
-- Name: userGuides_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zhanjiea
--

ALTER SEQUENCE public."userGuides_id_seq" OWNED BY public."userGuides".id;


--
-- Name: BannedPosts id; Type: DEFAULT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."BannedPosts" ALTER COLUMN id SET DEFAULT nextval('public."BannedPosts_id_seq"'::regclass);


--
-- Name: Bans id; Type: DEFAULT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."Bans" ALTER COLUMN id SET DEFAULT nextval('public."Bans_id_seq"'::regclass);


--
-- Name: BugReports id; Type: DEFAULT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."BugReports" ALTER COLUMN id SET DEFAULT nextval('public."BugReports_id_seq"'::regclass);


--
-- Name: Comments id; Type: DEFAULT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."Comments" ALTER COLUMN id SET DEFAULT nextval('public."Comments_id_seq"'::regclass);


--
-- Name: MapData id; Type: DEFAULT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."MapData" ALTER COLUMN id SET DEFAULT nextval('public."MapData_id_seq"'::regclass);


--
-- Name: Posts id; Type: DEFAULT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."Posts" ALTER COLUMN id SET DEFAULT nextval('public."Posts_id_seq"'::regclass);


--
-- Name: ReportComments id; Type: DEFAULT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."ReportComments" ALTER COLUMN id SET DEFAULT nextval('public."ReportComments_id_seq"'::regclass);


--
-- Name: ReportPosts id; Type: DEFAULT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."ReportPosts" ALTER COLUMN id SET DEFAULT nextval('public."ReportPosts_id_seq"'::regclass);


--
-- Name: Reports id; Type: DEFAULT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."Reports" ALTER COLUMN id SET DEFAULT nextval('public."Reports_id_seq"'::regclass);


--
-- Name: TravelPlans id; Type: DEFAULT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."TravelPlans" ALTER COLUMN id SET DEFAULT nextval('public."TravelPlans_id_seq"'::regclass);


--
-- Name: UserProfiles id; Type: DEFAULT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."UserProfiles" ALTER COLUMN id SET DEFAULT nextval('public."UserProfiles_id_seq"'::regclass);


--
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- Name: blogs id; Type: DEFAULT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public.blogs ALTER COLUMN id SET DEFAULT nextval('public.blogs_id_seq'::regclass);


--
-- Name: feedbacks id; Type: DEFAULT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public.feedbacks ALTER COLUMN id SET DEFAULT nextval('public.feedbacks_id_seq'::regclass);


--
-- Name: staffProfiles id; Type: DEFAULT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."staffProfiles" ALTER COLUMN id SET DEFAULT nextval('public."staffProfiles_id_seq"'::regclass);


--
-- Name: staffs id; Type: DEFAULT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public.staffs ALTER COLUMN id SET DEFAULT nextval('public.staffs_id_seq'::regclass);


--
-- Name: userGuides id; Type: DEFAULT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."userGuides" ALTER COLUMN id SET DEFAULT nextval('public."userGuides_id_seq"'::regclass);


--
-- Data for Name: BannedPosts; Type: TABLE DATA; Schema: public; Owner: zhanjiea
--

COPY public."BannedPosts" (id, "reportId", "createdAt", "updatedAt") FROM stdin;
1	2	2024-08-16 23:59:58.129+08	2024-08-16 23:59:58.129+08
2	1	2024-08-17 00:02:53.555+08	2024-08-17 00:02:53.555+08
3	4	2024-08-17 00:02:59.523+08	2024-08-17 00:02:59.523+08
4	4	2024-08-17 00:06:56.941+08	2024-08-17 00:06:56.941+08
\.


--
-- Data for Name: Bans; Type: TABLE DATA; Schema: public; Owner: zhanjiea
--

COPY public."Bans" (id, "userID", "timestampUnbanned", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: BugReports; Type: TABLE DATA; Schema: public; Owner: zhanjiea
--

COPY public."BugReports" (id, "userID", "userType", "bugContent", "pictureUrl", "bugState", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Comments; Type: TABLE DATA; Schema: public; Owner: zhanjiea
--

COPY public."Comments" (id, "userId", "postId", "commentContent", "createdAt", "updatedAt") FROM stdin;
1	1	1	so beautiful	2024-04-14 00:00:00+08	2024-04-14 00:00:00+08
2	4	1	wow	2024-08-14 00:00:00+08	2024-08-14 00:00:00+08
\.


--
-- Data for Name: MapData; Type: TABLE DATA; Schema: public; Owner: zhanjiea
--

COPY public."MapData" (id, "travelID", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: PostTags; Type: TABLE DATA; Schema: public; Owner: zhanjiea
--

COPY public."PostTags" (name, "postId", "createdAt", "updatedAt") FROM stdin;
Nature	1	2024-08-16 02:59:50.205+08	2024-08-16 02:59:50.205+08
\.


--
-- Data for Name: Posts; Type: TABLE DATA; Schema: public; Owner: zhanjiea
--

COPY public."Posts" (id, "userId", "postTitle", "pictureUrl", "postContent", location, "postLikes", "createdAt", "updatedAt") FROM stdin;
1	1	Beautiful Sunset at the Beach	https://example.com/images/post1.jpg	Captured a stunning sunset at the beach in Santa Monica. The sky was painted with hues of orange, pink, and purple, creating a mesmerizing view.	Santa Monica, California, USA	0	2024-08-16 02:59:50.194+08	2024-08-16 02:59:50.194+08
\.


--
-- Data for Name: ReportComments; Type: TABLE DATA; Schema: public; Owner: zhanjiea
--

COPY public."ReportComments" (id, "userId", "coomentId", "reportState", "reportContent", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: ReportPosts; Type: TABLE DATA; Schema: public; Owner: zhanjiea
--

COPY public."ReportPosts" (id, "userId", "postId", "reportState", "reportContent", "createdAt", "updatedAt") FROM stdin;
1	1	1	unverified	test3	2024-08-16 03:00:13.319+08	2024-08-16 03:00:13.319+08
2	1	1	unverified	test1	2024-08-16 03:00:18.576+08	2024-08-16 03:00:18.576+08
3	1	1	unverified	test2	2024-08-16 03:00:21.589+08	2024-08-16 03:00:21.589+08
4	1	1	unverified	test4	2024-08-16 03:00:25.546+08	2024-08-16 03:00:25.546+08
5	1	1	unverified	test4	2024-08-16 03:39:38.401+08	2024-08-16 03:39:38.401+08
\.


--
-- Data for Name: Reports; Type: TABLE DATA; Schema: public; Owner: zhanjiea
--

COPY public."Reports" (id, "userID", "reportType", "reportedID", "reportState", "reportContent", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: zhanjiea
--

COPY public."SequelizeMeta" (name) FROM stdin;
20240817101933-create-report-comment.js
20240724010217-create-user.js
20240724011413-create-user-profile.js
20240724011540-create-travel-plan.js
20240724011559-create-map-data.js
20240724011844-create-post.js
20240724012027-create-comment.js
20240724012205-create-ban.js
20240724012647-create-report.js
20240724012834-create-bug-report.js
20240724012940-create-feedback.js
20240724013149-create-staff.js
20240724013236-create-staff-profile.js
20240724013430-create-blog.js
20240724013552-create-user-guide.js
20240811140010-create-user-like.js
20240811142520-create-post-tag.js
20240814142112-create-report-post.js
20240815070332-create-banned-post.js
\.


--
-- Data for Name: TravelPlans; Type: TABLE DATA; Schema: public; Owner: zhanjiea
--

COPY public."TravelPlans" (id, "userID", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: UserLikes; Type: TABLE DATA; Schema: public; Owner: zhanjiea
--

COPY public."UserLikes" ("userId", "postId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: UserProfiles; Type: TABLE DATA; Schema: public; Owner: zhanjiea
--

COPY public."UserProfiles" (id, "userId", "profileDescription", "profilePictureUrl", "createdAt", "updatedAt") FROM stdin;
1	1	Experienced software developer with a passion for creating innovative solutions.	https://example.com/images/johndoe.jpg	2024-08-16 02:59:11.945+08	2024-08-16 02:59:11.945+08
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: zhanjiea
--

COPY public."Users" (id, username, password, email, "birthDate", gender, country, "phoneNumber", "createdAt", "updatedAt") FROM stdin;
1	johndoe123	$2b$10$oTrlutbD4DqDsDGYQEp83OWZIWQgMET7S/62NXaa5FifPfuBPkRqu	johndoe@example.com	1990-05-15 08:00:00+08	male	USA	+1-555-123-4567	2024-08-16 02:59:11.907+08	2024-08-16 02:59:11.907+08
4	ali	ali123	ali@mail.com	2003-04-14 00:00:00+08	male	kl	016-7361892	2003-04-14 00:00:00+08	2003-04-14 00:00:00+08
5	abu	abu123	abu@mail.com	2024-04-14 00:00:00+08	male	kl	016-7361893	2024-04-14 00:00:00+08	2024-04-14 00:00:00+08
\.


--
-- Data for Name: blogs; Type: TABLE DATA; Schema: public; Owner: zhanjiea
--

COPY public.blogs (id, "staffID", "blogTitle", "blogPicture", "blogContent", "blogLikes", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: feedbacks; Type: TABLE DATA; Schema: public; Owner: zhanjiea
--

COPY public.feedbacks (id, "userID", "userType", "feedbackContent", "pictureUrl", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: staffProfiles; Type: TABLE DATA; Schema: public; Owner: zhanjiea
--

COPY public."staffProfiles" (id, "staffID", "profileDescription", "pictureUrl", "createdAt", "updatedAt") FROM stdin;
1	1	Enthusiastic traveler and photographer with a love for exploring new cultures and cuisines.	https://example.com/images/janesmith.jpg	2024-08-16 03:01:10.623+08	2024-08-16 03:01:10.623+08
\.


--
-- Data for Name: staffs; Type: TABLE DATA; Schema: public; Owner: zhanjiea
--

COPY public.staffs (id, username, password, "userType", email, "birthDate", gender, country, "phoneNumber", "createdAt", "updatedAt") FROM stdin;
1	janesmith456	$2b$10$8E03xRfKliaAwZUJMjW.Xul8RJSpJO5yrsX9IF8UFgOfnk/hr7EGO	staff	janesmith@example.com	1985-08-25 08:00:00+08	female	Canada	+1-416-555-7890	2024-08-16 03:01:10.611+08	2024-08-16 03:01:10.611+08
\.


--
-- Data for Name: userGuides; Type: TABLE DATA; Schema: public; Owner: zhanjiea
--

COPY public."userGuides" (id, "staffID", "forUserType", "pictureUrl", content, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Name: BannedPosts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zhanjiea
--

SELECT pg_catalog.setval('public."BannedPosts_id_seq"', 4, true);


--
-- Name: Bans_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zhanjiea
--

SELECT pg_catalog.setval('public."Bans_id_seq"', 1, false);


--
-- Name: BugReports_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zhanjiea
--

SELECT pg_catalog.setval('public."BugReports_id_seq"', 1, false);


--
-- Name: Comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zhanjiea
--

SELECT pg_catalog.setval('public."Comments_id_seq"', 2, true);


--
-- Name: MapData_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zhanjiea
--

SELECT pg_catalog.setval('public."MapData_id_seq"', 1, false);


--
-- Name: Posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zhanjiea
--

SELECT pg_catalog.setval('public."Posts_id_seq"', 1, true);


--
-- Name: ReportComments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zhanjiea
--

SELECT pg_catalog.setval('public."ReportComments_id_seq"', 1, false);


--
-- Name: ReportPosts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zhanjiea
--

SELECT pg_catalog.setval('public."ReportPosts_id_seq"', 5, true);


--
-- Name: Reports_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zhanjiea
--

SELECT pg_catalog.setval('public."Reports_id_seq"', 1, false);


--
-- Name: TravelPlans_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zhanjiea
--

SELECT pg_catalog.setval('public."TravelPlans_id_seq"', 1, false);


--
-- Name: UserProfiles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zhanjiea
--

SELECT pg_catalog.setval('public."UserProfiles_id_seq"', 1, true);


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zhanjiea
--

SELECT pg_catalog.setval('public."Users_id_seq"', 5, true);


--
-- Name: blogs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zhanjiea
--

SELECT pg_catalog.setval('public.blogs_id_seq', 1, false);


--
-- Name: feedbacks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zhanjiea
--

SELECT pg_catalog.setval('public.feedbacks_id_seq', 1, false);


--
-- Name: staffProfiles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zhanjiea
--

SELECT pg_catalog.setval('public."staffProfiles_id_seq"', 1, true);


--
-- Name: staffs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zhanjiea
--

SELECT pg_catalog.setval('public.staffs_id_seq', 1, true);


--
-- Name: userGuides_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zhanjiea
--

SELECT pg_catalog.setval('public."userGuides_id_seq"', 1, false);


--
-- Name: BannedPosts BannedPosts_pkey; Type: CONSTRAINT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."BannedPosts"
    ADD CONSTRAINT "BannedPosts_pkey" PRIMARY KEY (id);


--
-- Name: Bans Bans_pkey; Type: CONSTRAINT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."Bans"
    ADD CONSTRAINT "Bans_pkey" PRIMARY KEY (id);


--
-- Name: Bans Bans_userID_key; Type: CONSTRAINT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."Bans"
    ADD CONSTRAINT "Bans_userID_key" UNIQUE ("userID");


--
-- Name: BugReports BugReports_pkey; Type: CONSTRAINT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."BugReports"
    ADD CONSTRAINT "BugReports_pkey" PRIMARY KEY (id);


--
-- Name: Comments Comments_pkey; Type: CONSTRAINT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."Comments"
    ADD CONSTRAINT "Comments_pkey" PRIMARY KEY (id);


--
-- Name: MapData MapData_pkey; Type: CONSTRAINT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."MapData"
    ADD CONSTRAINT "MapData_pkey" PRIMARY KEY (id);


--
-- Name: PostTags PostTags_pkey; Type: CONSTRAINT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."PostTags"
    ADD CONSTRAINT "PostTags_pkey" PRIMARY KEY (name);


--
-- Name: Posts Posts_pkey; Type: CONSTRAINT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."Posts"
    ADD CONSTRAINT "Posts_pkey" PRIMARY KEY (id);


--
-- Name: ReportComments ReportComments_pkey; Type: CONSTRAINT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."ReportComments"
    ADD CONSTRAINT "ReportComments_pkey" PRIMARY KEY (id);


--
-- Name: ReportPosts ReportPosts_pkey; Type: CONSTRAINT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."ReportPosts"
    ADD CONSTRAINT "ReportPosts_pkey" PRIMARY KEY (id);


--
-- Name: Reports Reports_pkey; Type: CONSTRAINT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."Reports"
    ADD CONSTRAINT "Reports_pkey" PRIMARY KEY (id);


--
-- Name: Reports Reports_userID_key; Type: CONSTRAINT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."Reports"
    ADD CONSTRAINT "Reports_userID_key" UNIQUE ("userID");


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: TravelPlans TravelPlans_pkey; Type: CONSTRAINT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."TravelPlans"
    ADD CONSTRAINT "TravelPlans_pkey" PRIMARY KEY (id);


--
-- Name: UserLikes UserLikes_pkey; Type: CONSTRAINT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."UserLikes"
    ADD CONSTRAINT "UserLikes_pkey" PRIMARY KEY ("userId", "postId");


--
-- Name: UserProfiles UserProfiles_pkey; Type: CONSTRAINT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_pkey" PRIMARY KEY (id);


--
-- Name: UserProfiles UserProfiles_userId_key; Type: CONSTRAINT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key" UNIQUE ("userId");


--
-- Name: Users Users_email_key; Type: CONSTRAINT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);


--
-- Name: Users Users_phoneNumber_key; Type: CONSTRAINT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_phoneNumber_key" UNIQUE ("phoneNumber");


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: Users Users_username_key; Type: CONSTRAINT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key" UNIQUE (username);


--
-- Name: blogs blogs_pkey; Type: CONSTRAINT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public.blogs
    ADD CONSTRAINT blogs_pkey PRIMARY KEY (id);


--
-- Name: feedbacks feedbacks_pkey; Type: CONSTRAINT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public.feedbacks
    ADD CONSTRAINT feedbacks_pkey PRIMARY KEY (id);


--
-- Name: staffProfiles staffProfiles_pkey; Type: CONSTRAINT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."staffProfiles"
    ADD CONSTRAINT "staffProfiles_pkey" PRIMARY KEY (id);


--
-- Name: staffProfiles staffProfiles_staffID_key; Type: CONSTRAINT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."staffProfiles"
    ADD CONSTRAINT "staffProfiles_staffID_key" UNIQUE ("staffID");


--
-- Name: staffs staffs_email_key; Type: CONSTRAINT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public.staffs
    ADD CONSTRAINT staffs_email_key UNIQUE (email);


--
-- Name: staffs staffs_phoneNumber_key; Type: CONSTRAINT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public.staffs
    ADD CONSTRAINT "staffs_phoneNumber_key" UNIQUE ("phoneNumber");


--
-- Name: staffs staffs_pkey; Type: CONSTRAINT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public.staffs
    ADD CONSTRAINT staffs_pkey PRIMARY KEY (id);


--
-- Name: staffs staffs_username_key; Type: CONSTRAINT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public.staffs
    ADD CONSTRAINT staffs_username_key UNIQUE (username);


--
-- Name: userGuides userGuides_pkey; Type: CONSTRAINT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."userGuides"
    ADD CONSTRAINT "userGuides_pkey" PRIMARY KEY (id);


--
-- Name: BannedPosts BannedPosts_reportId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."BannedPosts"
    ADD CONSTRAINT "BannedPosts_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES public."ReportPosts"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Bans Bans_userID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."Bans"
    ADD CONSTRAINT "Bans_userID_fkey" FOREIGN KEY ("userID") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Comments Comments_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."Comments"
    ADD CONSTRAINT "Comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES public."Posts"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Comments Comments_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."Comments"
    ADD CONSTRAINT "Comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PostTags PostTags_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."PostTags"
    ADD CONSTRAINT "PostTags_postId_fkey" FOREIGN KEY ("postId") REFERENCES public."Posts"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Posts Posts_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."Posts"
    ADD CONSTRAINT "Posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ReportComments ReportComments_coomentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."ReportComments"
    ADD CONSTRAINT "ReportComments_coomentId_fkey" FOREIGN KEY ("coomentId") REFERENCES public."Comments"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ReportComments ReportComments_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."ReportComments"
    ADD CONSTRAINT "ReportComments_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ReportPosts ReportPosts_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."ReportPosts"
    ADD CONSTRAINT "ReportPosts_postId_fkey" FOREIGN KEY ("postId") REFERENCES public."Posts"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ReportPosts ReportPosts_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."ReportPosts"
    ADD CONSTRAINT "ReportPosts_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Reports Reports_userID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."Reports"
    ADD CONSTRAINT "Reports_userID_fkey" FOREIGN KEY ("userID") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserLikes UserLikes_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."UserLikes"
    ADD CONSTRAINT "UserLikes_postId_fkey" FOREIGN KEY ("postId") REFERENCES public."Posts"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserLikes UserLikes_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."UserLikes"
    ADD CONSTRAINT "UserLikes_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserProfiles UserProfiles_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: blogs blogs_staffID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public.blogs
    ADD CONSTRAINT "blogs_staffID_fkey" FOREIGN KEY ("staffID") REFERENCES public.staffs(id);


--
-- Name: staffProfiles staffProfiles_staffID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."staffProfiles"
    ADD CONSTRAINT "staffProfiles_staffID_fkey" FOREIGN KEY ("staffID") REFERENCES public.staffs(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: userGuides userGuides_staffID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zhanjiea
--

ALTER TABLE ONLY public."userGuides"
    ADD CONSTRAINT "userGuides_staffID_fkey" FOREIGN KEY ("staffID") REFERENCES public.staffs(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

