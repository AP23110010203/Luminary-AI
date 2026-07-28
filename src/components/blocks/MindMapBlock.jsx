import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, ChevronRight, ChevronDown, Circle, Layers, Info } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';

function MindMapNode({ node, depth = 0 }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  const depthColors = [
    'border-brand-500/50 bg-brand-950/30 text-brand-300',
    'border-purple-500/40 bg-purple-950/20 text-purple-300',
    'border-emerald-500/40 bg-emerald-950/20 text-emerald-300',
    'border-amber-500/40 bg-amber-950/20 text-amber-300',
  ];

  const currentStyle = depthColors[depth % depthColors.length];

  return (
    <div className="relative space-y-2">
      {/* Node Card */}
      <div className="flex items-center space-x-2">
        {hasChildren && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors"
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-brand-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-slate-400" />
            )}
          </button>
        )}

        {!hasChildren && <Circle className="w-2 h-2 text-slate-500 ml-2 mr-1" />}

        <div
          onClick={() => hasChildren && setIsExpanded(!isExpanded)}
          className={`
            p-3.5 rounded-xl border backdrop-blur-md transition-all duration-200 cursor-pointer
            flex-1 max-w-xl ${currentStyle} hover:border-slate-600
          `}
        >
          <div className="flex items-center justify-between">
            <h5 className="font-semibold text-sm text-white">{node.label}</h5>
            {hasChildren && (
              <Badge variant="purple" className="text-[10px]">
                {node.children.length} subtopics
              </Badge>
            )}
          </div>
          {node.description && (
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">{node.description}</p>
          )}
        </div>
      </div>

      {/* Children Tree Branch */}
      <AnimatePresence>
        {hasChildren && isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="pl-6 ml-3 border-l-2 border-slate-800/80 space-y-3 pt-1"
          >
            {node.children.map((childNode) => (
              <MindMapNode key={childNode.id} node={childNode} depth={depth + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function MindMapBlock({ mindMapBlockData, className = '' }) {
  const { root, topic } = mindMapBlockData || {};

  if (!root) {
    return (
      <GlassCard className="text-center py-12">
        <p className="text-slate-400">No Mind Map structure available for this session.</p>
      </GlassCard>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <GlassCard className="space-y-4" hoverEffect={false}>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-purple-400 flex items-center space-x-1">
              <Network className="w-3.5 h-3.5" />
              <span>Hierarchical Mind Map</span>
            </span>
            <h3 className="text-xl font-bold text-white">{topic || root.label}</h3>
          </div>

          <Badge variant="brand">Interactive Concept Map</Badge>
        </div>

        <p className="text-xs text-slate-400">
          Click nodes or arrow icons to expand/collapse subtopics and explore hierarchical relationships.
        </p>

        {/* Tree Root */}
        <div className="pt-2">
          <MindMapNode node={root} depth={0} />
        </div>
      </GlassCard>
    </div>
  );
}
