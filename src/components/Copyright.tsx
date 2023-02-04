import Link from "next/link";

export default (props: any) => (
  <p variant="body2" color="text.secondary" align="center" {...props}>
    {'Copyright © '}
    <Link color="inherit" href="/">
      Your Website
    </Link>{' '}
    {new Date().getFullYear()}
    {'.'}
  </p>
);
