import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../lib/utils'

const MotionSpan = motion.span

function renderIcon(icon, isActive) {
  if (!icon) return null

  if (React.isValidElement(icon)) {
    return React.cloneElement(icon, {
      className: cn('h-4 w-4 shrink-0', icon.props.className),
      'aria-hidden': true,
    })
  }

  const Icon = icon
  return <Icon className="h-4 w-4 shrink-0" aria-hidden="true" data-active={isActive} />
}

export default function Tabs({ tabs = [], activeTab, onChange }) {
  return (
    <div className="w-full overflow-x-auto border-b border-border">
      <div className="flex min-w-max items-center" role="tablist">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`${tab.id}-panel`}
              onClick={() => onChange?.(tab.id)}
              className={cn(
                'relative flex h-11 items-center gap-2 whitespace-nowrap px-4 text-sm font-medium transition-colors',
                'text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                isActive && 'text-foreground'
              )}
            >
              {renderIcon(tab.icon, isActive)}
              <span>{tab.label}</span>
              {isActive && (
                <MotionSpan
                  layoutId="tabs-active-indicator"
                  className="absolute inset-x-0 bottom-[-1px] h-0.5 rounded-full bg-primary"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
