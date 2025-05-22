import { useMemo } from 'react'
import { useMediaQuery } from 'react-responsive'

import { PROFILE_SETTINGS } from '@/shared/config/router'
import { useTranslate } from '@/shared/lib/useTranslate'
import { NextPageWithLayout } from '@/shared/types'
import { TabContent, TabSwitcher, TabType } from '@/shared/ui'
import { getMainLayout } from '@/widgets/layouts'
import { AccountManagement, MyPayments, UserSettings } from '@/widgets/settings-tabs'
import { MyPaymentsMobile } from '@/widgets/settings-tabs/my-payments/ui/my-payment-mobile/MyPaymentsMobile'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'

const useTabs = () => {
  const t = useTranslate()
  const { locale } = useRouter()

  return useMemo(() => {
    return [
      { text: t('General Information'), value: 'general-information' },
      { text: t('Devices'), value: 'devices' },
      { text: t('Account Management'), value: 'account-management' },
      { text: t('My Payments'), value: 'my-payments' },
    ]
  }, [locale])
}

export const getServerSideProps = async function (ctx) {
  const activeTabKeys = Object.keys(ctx.query)

  if (activeTabKeys.length === 0) {
    return {
      props: {
        activeTab: null,
      },
    }
  }

  return {
    props: {
      activeTab: activeTabKeys[0],
    },
  }
} satisfies GetServerSideProps<{
  activeTab: null | string
}>

const Settings: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  activeTab,
}) => {
  const tabs: TabType[] = useTabs()
  const router = useRouter()
  const isMobile = useMediaQuery({ query: '(max-width:40.625rem)' })

  const handleTabChange = (value: string) => {
    if (value === tabs[0].value) {
      router.push(PROFILE_SETTINGS, undefined, { locale: router.locale })
    } else {
      router.push(`${router.pathname}?${value}`, undefined, {
        locale: router.locale,
      })
    }
  }

  return (
    <div>
      <TabSwitcher onValueChange={handleTabChange} tabs={tabs} value={activeTab ?? tabs[0].value}>
        <TabContent value={tabs[0].value}>
          <UserSettings />
        </TabContent>

        <TabContent value={tabs[2].value}>
          <AccountManagement />
        </TabContent>

        <TabContent value={tabs[3].value}>
          {isMobile ? <MyPaymentsMobile /> : <MyPayments />}
        </TabContent>
      </TabSwitcher>
    </div>
  )
}

Settings.getLayout = getMainLayout

export default Settings
