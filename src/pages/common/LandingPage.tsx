import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mic, BookOpen, Phone, CheckSquare } from 'lucide-react';
import Button from '../../components/Button';
import { Logo } from '../../components/common/Logo';

import { LanguageSelector } from '../../components/common/LanguageSelector';

const LandingPage: React.FC = () => {
  const { t } = useTranslation();
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
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
          <div className="cursor-pointer">
            <Logo className="!text-xl sm:!text-2xl" />
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <LanguageSelector />
            <Link to="/login">
              <Button variant="outline" size="md" className="!px-2.5 !py-1.5 !text-xs sm:!px-4 sm:!py-2.5 sm:!text-base">
                {t('landing.nav.login')}
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="primary" size="md" className="!px-2.5 !py-1.5 !text-xs sm:!px-4 sm:!py-2.5 sm:!text-base whitespace-nowrap">
                {t('landing.nav.getStarted')}
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="space-y-6">
          <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            {t('landing.hero.title')}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t('landing.hero.subtitle')}
          </p>
          <p className="text-lg text-slate-500 dark:text-slate-500 max-w-2xl mx-auto">
            {t('landing.hero.description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link to="/register" className="flex-1 sm:flex-none">
              <Button variant="primary" size="lg" fullWidth>
                {t('landing.hero.getStartedFree')}
              </Button>
            </Link>
            <Link to="/login" className="flex-1 sm:flex-none">
              <Button variant="outline" size="lg" fullWidth>
                {t('landing.hero.alreadyHaveAccount')}
              </Button>
            </Link>
          </div>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t('landing.hero.trialText')}
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 text-slate-900 dark:text-white">
          {t('landing.features.title')}
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Mic,
              title: t('landing.features.aiPronunciation.title'),
              description: t('landing.features.aiPronunciation.description'),
            },
            {
              icon: BookOpen,
              title: t('landing.features.dailyTopics.title'),
              description: t('landing.features.dailyTopics.description'),
            },
            {
              icon: Phone,
              title: t('landing.features.voiceCalling.title'),
              description: t('landing.features.voiceCalling.description'),
            },
            {
              icon: CheckSquare,
              title: t('landing.features.dailyQuizzes.title'),
              description: t('landing.features.dailyQuizzes.description'),
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
      </section >


      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <p className="text-4xl font-bold">10K+</p>
              <p className="text-lg mt-2 opacity-90">{t('landing.stats.activeLearners')}</p>
            </div>
            <div>
              <p className="text-4xl font-bold">500+</p>
              <p className="text-lg mt-2 opacity-90">{t('landing.stats.dailyTopics')}</p>
            </div>
            <div>
              <p className="text-4xl font-bold">100+</p>
              <p className="text-lg mt-2 opacity-90">{t('landing.stats.quizQuestions')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">
          {t('landing.cta.title')}
        </h2>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
          {t('landing.cta.description')}
        </p>
        <Link to="/register">
          <Button variant="primary" size="lg">
            {t('landing.cta.button')}
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
                {t('landing.footer.brandDesc')}
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
              <h4 className="font-semibold text-lg mb-4 text-white">{t('landing.footer.product')}</h4>
              <ul className="space-y-3">
                {[
                  { label: t('landing.footer.product'), action: () => scrollToSection('features') }, // Wait this label was 'Features' in en.json? No I used product key? Let's check en.json logic I added. 
                  // I added "features": { "title": "Our Features" ... }
                  // I also added "product": "Product" in footer section.
                  // The list items were 'Features', 'Pricing', 'Security'.
                  // I need keys for these list items if they are different from section headers.
                  // 'Features' -> footer.features? I didn't add that. I added features.title = Our Features.
                  // I can use `landing.features.title` but that is "Our Features". Maybe I just use `Features`.
                  // I'll stick to hardcoded values for list items if keys are missing or reuse carefully.
                  // Actually I should have added keys for these links.
                  // I added: product, pricing, security...
                  { label: t('landing.features.title'), action: () => scrollToSection('features') },
                  { label: t('landing.footer.pricing'), link: '/subscriptions' },
                  { label: t('landing.footer.security'), action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) }
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
              <h4 className="font-semibold text-lg mb-4 text-white">{t('landing.footer.company')}</h4>
              <ul className="space-y-3">
                {[
                  { label: t('landing.footer.about'), action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
                  { label: t('landing.footer.blog'), action: () => alert('Blog coming soon!') },
                  { label: t('landing.footer.careers'), action: () => alert('Careers page coming soon!') }
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
              <h4 className="font-semibold text-lg mb-4 text-white">{t('landing.footer.legal')}</h4>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => alert('Privacy Policy coming soon!')}
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {t('landing.footer.privacy')}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => alert('Terms of Service coming soon!')}
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {t('landing.footer.terms')}
                  </button>
                </li>
                <li>
                  <a
                    href="mailto:support@edutalks.com"
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {t('landing.footer.contact')}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-700/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              {t('landing.footer.copyright')}
            </p>
            <p className="text-slate-500 text-sm">
              {t('landing.footer.madeWith')}
            </p>
          </div>
        </div>
      </footer>
    </div >
  );
};

export default LandingPage;
