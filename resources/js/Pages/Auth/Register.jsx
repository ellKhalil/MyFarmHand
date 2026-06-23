import { useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const [step, setStep] = useState(1);
    const [focus, setFocus] = useState([]);

    const toggleFocus = (option) => {
        if (focus.includes(option)) {
            setFocus(focus.filter(f => f !== option));
        } else {
            setFocus([...focus, option]);
        }
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        company_name: '',
        phone_number: '',
    });

    const nextStep = () => {
        if (step === 1) {
            if (!data.name || !data.email || !data.password || !data.password_confirmation) return;
            if (data.password !== data.password_confirmation) return;
        }
        if (step === 2) {
            if (!data.company_name) return;
        }
        setStep(s => s + 1);
    };

    const prevStep = () => setStep(s => s - 1);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register Enterprise" />

            {/* Stepper Header */}
            <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
                    {step === 1 && "Create your Account"}
                    {step === 2 && "Farm Details"}
                    {step === 3 && "Primary Focus"}
                    {step === 4 && "Final Review"}
                </h2>
                <div className="flex justify-between items-center relative px-2">
                    <div className="absolute left-2 right-2 top-1/2 -translate-y-1/2 h-1 bg-gray-200 rounded-full -z-10"></div>
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 h-1 bg-green-500 rounded-full transition-all duration-300 -z-10" style={{ width: `calc(${((step - 1) / 3) * 100}% - 16px)` }}></div>
                    
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 border-2 ${step >= i ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-400 border-gray-200'}`}>
                            {i}
                        </div>
                    ))}
                </div>
            </div>

            <form onSubmit={submit}>
                {/* Step 1: Account Details */}
                {step === 1 && (
                    <div className="space-y-4 animate-fade-in">
                        <div>
                            <InputLabel htmlFor="name" value="Full Name" />
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="email" value="Work Email" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="password" value="Password" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />
                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>
                        
                        <div className="pt-4 flex items-center justify-between">
                            <Link href={route('login')} className="text-sm text-green-700 hover:text-green-900 font-medium">
                                Already registered?
                            </Link>
                            <PrimaryButton type="button" onClick={nextStep} className="px-6 py-3" disabled={!data.name || !data.email || !data.password || data.password !== data.password_confirmation}>
                                Continue
                            </PrimaryButton>
                        </div>
                    </div>
                )}

                {/* Step 2: Farm Information */}
                {step === 2 && (
                    <div className="space-y-4 animate-fade-in">
                        <p className="text-sm text-gray-500 mb-6 text-center">Tell us a bit about your agricultural operations so we can set up your enterprise environment.</p>
                        
                        <div>
                            <InputLabel htmlFor="company_name" value="Farm / Company Name" />
                            <TextInput
                                id="company_name"
                                name="company_name"
                                value={data.company_name}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) => setData('company_name', e.target.value)}
                                required
                            />
                            <InputError message={errors.company_name} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="phone_number" value="Phone Number (Optional)" />
                            <TextInput
                                id="phone_number"
                                name="phone_number"
                                type="tel"
                                value={data.phone_number}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('phone_number', e.target.value)}
                            />
                            <InputError message={errors.phone_number} className="mt-2" />
                        </div>

                        <div className="pt-6 flex justify-between">
                            <button type="button" onClick={prevStep} className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium">Back</button>
                            <PrimaryButton type="button" onClick={nextStep} className="px-6 py-3" disabled={!data.company_name}>
                                Continue
                            </PrimaryButton>
                        </div>
                    </div>
                )}

                {/* Step 3: Focus Area */}
                {step === 3 && (
                    <div className="space-y-4 animate-fade-in">
                        <p className="text-sm text-gray-500 mb-4 text-center">What is your primary goal with MyFarmHand?</p>
                        <div className="grid grid-cols-1 gap-3">
                            {['Inventory & Logistics', 'Payroll & Staff', 'Financial Ledgers', 'Complete Enterprise'].map((option) => {
                                const isSelected = focus.includes(option);
                                return (
                                <div 
                                    key={option}
                                    onClick={() => toggleFocus(option)}
                                    className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 ${isSelected ? 'border-green-500 bg-green-50 shadow-sm' : 'border-gray-100 hover:border-green-300 bg-white'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center ${isSelected ? 'border-green-500 bg-green-500' : 'border-gray-300 bg-white'}`}>
                                            {isSelected && <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                                        </div>
                                        <span className={`font-medium ${isSelected ? 'text-green-800' : 'text-gray-600'}`}>{option}</span>
                                    </div>
                                </div>
                                );
                            })}
                        </div>
                        <div className="pt-6 flex justify-between">
                            <button type="button" onClick={prevStep} className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium">Back</button>
                            <PrimaryButton type="button" onClick={nextStep} className="px-6 py-3" disabled={focus.length === 0}>
                                Continue
                            </PrimaryButton>
                        </div>
                    </div>
                )}

                {/* Step 4: Final Review */}
                {step === 4 && (
                    <div className="space-y-6 animate-fade-in text-center">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">You're ready to go!</h3>
                        <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
                            You are about to create the enterprise account for <span className="font-bold text-gray-800">{data.company_name}</span>. You will be assigned as the system administrator.
                        </p>
                        
                        <div className="bg-gray-50 rounded-2xl p-5 text-left border border-gray-100 shadow-inner mt-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-sm">
                                    <span className="text-gray-400 block text-xs uppercase tracking-wider font-semibold">Admin Name</span>
                                    <span className="font-semibold text-gray-900 mt-1 block">{data.name}</span>
                                </div>
                                <div className="text-sm">
                                    <span className="text-gray-400 block text-xs uppercase tracking-wider font-semibold">Primary Focus</span>
                                    <span className="font-semibold text-gray-900 mt-1 block">{focus.join(', ')}</span>
                                </div>
                                <div className="text-sm col-span-2">
                                    <span className="text-gray-400 block text-xs uppercase tracking-wider font-semibold">Admin Email</span>
                                    <span className="font-semibold text-gray-900 mt-1 block">{data.email}</span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 flex flex-col gap-3">
                            <PrimaryButton className="w-full justify-center py-3.5 text-lg shadow-lg hover:shadow-xl transition-all" disabled={processing}>
                                Complete Registration
                            </PrimaryButton>
                            <button type="button" onClick={prevStep} className="px-4 py-2 text-gray-500 hover:text-gray-800 text-sm font-medium transition-colors">Make changes</button>
                        </div>
                    </div>
                )}
            </form>
        </GuestLayout>
    );
}
