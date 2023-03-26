import Image from "next/image";
import { BasicAuth, DiscordLogin, GoogleLogin } from "..";

export default function LoginForm() {
    // const basicAuthSignIn = () => {
    //     console.log('sign in')
    // }

    return (
        <>
            <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    {/* add logo here */}
                    <img
                        className="mx-auto h-12 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <BasicAuth />

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="bg-white px-2 text-gray-500">Or continue with</span>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-3 gap-3">
                                <button
                                    disabled={true}
                                    className="inline-flex w-full justify-center rounded-md bg-white py-2 px-4 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300"
                                >
                                    <span className="sr-only">Sign in with Discord</span>
                                    <Image
                                        className="h-5 w-5 rounded-full"
                                        alt=""
                                        width='50'
                                        height='50'
                                        src={'/facebook_logo.svg'}
                                    />
                                </button>

                                <DiscordLogin />
                                <GoogleLogin />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
