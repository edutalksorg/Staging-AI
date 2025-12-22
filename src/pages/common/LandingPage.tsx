import React from 'react';
import { Link } from 'react-router-dom';
import { Mic, BookOpen, Phone, CheckSquare } from 'lucide-react';
import Button from '../../components/Button';
import { Logo } from '../../components/common/Logo';

const LandingPage: React.FC = () => {
  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-dvh bg-white dark:bg-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="cursor-pointer">
            <Logo />
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="outline" size="md">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="primary" size="md">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="space-y-6">
          <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            Welcome to EduTalks
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Master English. Connect with the World.
          </p>
          <p className="text-lg text-slate-500 dark:text-slate-500 max-w-2xl mx-auto">
            Learn English through real conversations, AI-powered feedback, and daily practice with learners worldwide.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link to="/register" className="flex-1 sm:flex-none">
              <Button variant="primary" size="lg" fullWidth>
                Get Started Free
              </Button>
            </Link>
            <Link to="/login" className="flex-1 sm:flex-none">
              <Button variant="outline" size="lg" fullWidth>
                Already Have Account?
              </Button>
            </Link>
          </div>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            🎁 Get 24 hours of free trial - No credit card required
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 text-slate-900 dark:text-white">
          Our Features
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Mic,
              title: 'AI Pronunciation',
              description: 'Perfect your pronunciation with AI-powered feedback and real-time analysis.',
            },
            {
              icon: BookOpen,
              title: 'Daily Topics',
              description: 'Learn new topics every day to improve your English vocabulary and grammar.',
            },
            {
              icon: Phone,
              title: 'Voice Calling',
              description: 'Practice speaking with other learners in real-time WebRTC calls.',
            },
            {
              icon: CheckSquare,
              title: 'Daily Quizzes',
              description: 'Test your knowledge with engaging and interactive quizzes daily.',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="card text-center hover:scale-105 transform transition-transform"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <p className="text-4xl font-bold">10K+</p>
              <p className="text-lg mt-2 opacity-90">Active Learners</p>
            </div>
            <div>
              <p className="text-4xl font-bold">500+</p>
              <p className="text-lg mt-2 opacity-90">Daily Topics</p>
            </div>
            <div>
              <p className="text-4xl font-bold">100+</p>
              <p className="text-lg mt-2 opacity-90">Quiz Questions</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">
          Start Learning Today
        </h2>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
          Join thousands of English learners and start your journey to fluency.
        </p>
        <Link to="/register">
          <Button variant="primary" size="lg">
            Create Free Account
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

          {/* Main Footer Content */}
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            {/* Brand Column - Larger */}
            <div className="md:col-span-2">
              <div className="mb-4">
                <Logo />
              </div>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Master English. Connect with the World. Join thousands of learners improving their English through real conversations and AI-powered feedback.
              </p>
              {/* Social Media Icons */}
              <div className="flex gap-3">
                {[
                  { name: 'Twitter', icon: '𝕏' },
                  { name: 'Facebook', icon: 'f' },
                  { name: 'LinkedIn', icon: 'in' },
                  { name: 'Instagram', icon: '📷' }
                ].map((social) => (
                  <button
                    key={social.name}
                    onClick={() => alert(`${social.name} coming soon!`)}
                    className="w-10 h-10 rounded-lg bg-slate-800/50 hover:bg-gradient-to-br hover:from-primary-600 hover:to-secondary-600 border border-slate-700 hover:border-transparent flex items-center justify-center transition-all transform hover:scale-110"
                    aria-label={social.name}
                  >
                    <span className="text-sm font-bold">{social.icon}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Product Column */}
            <div>
              <h4 className="font-semibold text-lg mb-4 text-white">Product</h4>
              <ul className="space-y-3">
                {[
                  { label: 'Features', action: () => scrollToSection('features') },
                  { label: 'Pricing', link: '/subscriptions' },
                  { label: 'Security', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) }
                ].map((item) => (
                  <li key={item.label}>
                    {item.link ? (
                      <Link
                        to={item.link}
                        className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                      >
                        <span className="w-1 h-1 rounded-full bg-primary-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        {item.label}
                      </Link>
                    ) : (
                      <button
                        onClick={item.action}
                        className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                      >
                        <span className="w-1 h-1 rounded-full bg-primary-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        {item.label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="font-semibold text-lg mb-4 text-white">Company</h4>
              <ul className="space-y-3">
                {[
                  { label: 'About', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
                  { label: 'Blog', action: () => alert('Blog coming soon!') },
                  { label: 'Careers', action: () => alert('Careers page coming soon!') }
                ].map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={item.action}
                      className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h4 className="font-semibold text-lg mb-4 text-white">Legal</h4>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => alert('Privacy Policy coming soon!')}
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Privacy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => alert('Terms of Service coming soon!')}
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Terms
                  </button>
                </li>
                <li>
                  <a
                    href="mailto:support@edutalks.com"
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-700/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © 2025 EduTalks. All rights reserved.
            </p>
            <p className="text-slate-500 text-sm">
              Made with ❤️ for English learners worldwide
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
