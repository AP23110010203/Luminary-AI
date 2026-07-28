import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, Search, Maximize2, Minimize2, X, Sparkles, HelpCircle, Layers, ArrowRight, CheckCircle2 } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';

// Custom Glassmorphic Graph Node Component
function CustomGraphNode({ data, selected }) {
  const isHighlighted = data.isHighlighted;
  const isDimmed = data.isDimmed;

  return (
    <div
      className={`
        relative p-4 rounded-2xl backdrop-blur-2xl border transition-all duration-300 w-[200px] select-none cursor-pointer
        ${
          selected || isHighlighted
            ? 'bg-[#0A1023] border-[#00E5FF] shadow-[0_0_30px_rgba(0,229,255,0.5)] scale-105 z-30'
            : isDimmed
            ? 'bg-[#040816]/60 border-slate-800/40 opacity-30 scale-95'
            : 'bg-[#0A1023]/90 border-[#4F8CFF]/40 hover:border-[#00E5FF] hover:shadow-[0_0_20px_rgba(79,140,255,0.3)]'
        }
      `}
    >
      <Handle type="target" position={Position.Top} className="!bg-[#00E5FF] !w-3 !h-3 !border-2 !border-[#040816]" />
      
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Badge variant={data.category === 'Core' ? 'purple' : 'brand'} className="text-[10px] py-0.5 px-2 font-bold">
            {data.category || 'Concept'}
          </Badge>
        </div>
        <h4 className="font-extrabold text-sm text-white leading-snug mt-1">{data.label}</h4>
        {data.description && (
          <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
            {data.description}
          </p>
        )}
      </div>

      <Handle type="source" position={Position.Bottom} className="!bg-[#7B61FF] !w-3 !h-3 !border-2 !border-[#040816]" />
    </div>
  );
}

const nodeTypes = { custom: CustomGraphNode };

export function KnowledgeGraphBlock({ knowledgeGraphData, className = '' }) {
  const { nodes: rawNodes = [], edges: rawEdges = [], topic } = knowledgeGraphData || {};
  const [selectedNode, setSelectedNode] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [rfInstance, setRfInstance] = useState(null);

  // Topic-tailored fallback node generation if rawNodes is empty
  const activeNodesData = useMemo(() => {
    if (rawNodes && rawNodes.length > 0) return rawNodes;
    const currentTopic = topic || 'Study Topic';
    return [
      { id: 'n-root', label: currentTopic, category: 'Core Concept', description: `Central subject node for ${currentTopic}.` },
      { id: 'n-foundations', label: `${currentTopic} Foundations`, category: 'Principles', description: `Essential definitions and primary background of ${currentTopic}.` },
      { id: 'n-structure', label: `Core Structures & Features`, category: 'Architecture', description: `Key elements, parameters, and structural components.` },
      { id: 'n-workflow', label: `Workflows & Operations`, category: 'Execution', description: `Practical procedures, implementation methods, and data flows.` },
      { id: 'n-impact', label: `Applications & Significance`, category: 'Impact', description: `Real-world applications, practical utility, and modern legacy.` },
    ];
  }, [rawNodes, topic]);

  const activeEdgesData = useMemo(() => {
    if (rawEdges && rawEdges.length > 0) return rawEdges;
    return [
      { id: 'e-1', source: 'n-root', target: 'n-foundations', label: 'defined by' },
      { id: 'e-2', source: 'n-root', target: 'n-structure', label: 'comprises' },
      { id: 'e-3', source: 'n-structure', target: 'n-workflow', label: 'operates via' },
      { id: 'e-4', source: 'n-workflow', target: 'n-impact', label: 'delivers' },
    ];
  }, [rawEdges]);

  // Layout positions on a structured grid
  const initialNodes = useMemo(() => {
    return activeNodesData.map((n, idx) => {
      const col = idx % 3;
      const row = Math.floor(idx / 3);
      const x = col * 260 + 40;
      const y = row * 180 + 40;

      return {
        id: n.id,
        type: 'custom',
        position: { x, y },
        style: { width: 200 },
        data: {
          label: n.label,
          category: n.category,
          description: n.description,
        },
      };
    });
  }, [activeNodesData]);

  const initialEdges = useMemo(() => {
    return activeEdgesData.map((e) => ({
      id: e.id || `e-${e.source}-${e.target}`,
      source: e.source,
      target: e.target,
      label: e.label || e.relationship || 'connects to',
      animated: true,
      style: { stroke: '#7B61FF', strokeWidth: 2.5 },
      labelStyle: { fill: '#00E5FF', fontSize: 11, fontWeight: 700 },
      labelBgStyle: { fill: '#040816', fillOpacity: 0.9, rx: 6, ry: 6 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#7B61FF' },
    }));
  }, [activeEdgesData]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Synchronize when data updates
  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  // Center view on load or resize
  useEffect(() => {
    if (rfInstance) {
      setTimeout(() => {
        rfInstance.fitView({ padding: 0.3, duration: 400 });
      }, 100);
    }
  }, [rfInstance, nodes]);

  // Highlight connected neighbors
  const handleNodeClick = useCallback(
    (event, node) => {
      setSelectedNode(node);
      const connectedNodeIds = new Set();
      connectedNodeIds.add(node.id);

      activeEdgesData.forEach((e) => {
        if (e.source === node.id) connectedNodeIds.add(e.target);
        if (e.target === node.id) connectedNodeIds.add(e.source);
      });

      setNodes((nds) =>
        nds.map((n) => ({
          ...n,
          data: {
            ...n.data,
            isHighlighted: connectedNodeIds.has(n.id),
            isDimmed: !connectedNodeIds.has(n.id),
          },
        }))
      );
    },
    [activeEdgesData, setNodes]
  );

  const handleClearSelection = () => {
    setSelectedNode(null);
    setNodes((nds) =>
      nds.map((n) => ({
        ...n,
        data: {
          ...n.data,
          isHighlighted: false,
          isDimmed: false,
        },
      }))
    );
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (!term.trim()) {
      handleClearSelection();
      return;
    }

    setNodes((nds) =>
      nds.map((n) => {
        const matches = n.data.label.toLowerCase().includes(term.toLowerCase());
        return {
          ...n,
          data: {
            ...n.data,
            isHighlighted: matches,
            isDimmed: !matches,
          },
        };
      })
    );
  };

  const connectedNeighbors = useMemo(() => {
    if (!selectedNode) return [];
    const neighbors = [];
    activeEdgesData.forEach((e) => {
      if (e.source === selectedNode.id) {
        const targetNode = activeNodesData.find((n) => n.id === e.target);
        if (targetNode) neighbors.push({ ...targetNode, relation: e.label || 'connects to' });
      }
      if (e.target === selectedNode.id) {
        const sourceNode = activeNodesData.find((n) => n.id === e.source);
        if (sourceNode) neighbors.push({ ...sourceNode, relation: 'connected from' });
      }
    });
    return neighbors;
  }, [selectedNode, activeEdgesData, activeNodesData]);

  return (
    <div
      className={`
        relative space-y-4 ${className}
        ${isFullscreen ? 'fixed inset-0 z-50 bg-[#040816] p-6 flex flex-col' : ''}
      `}
    >
      {/* Top Header & Toolbar */}
      <GlassCard className="space-y-4 border-[#4F8CFF]/40 bg-[#0A1023]/90" hoverEffect={false}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Network className="w-6 h-6 text-[#00E5FF]" />
              <h2 className="text-xl font-extrabold text-white tracking-tight">AI Knowledge Graph</h2>
              <Badge variant="purple">{nodes.length} Concept Nodes</Badge>
            </div>
            <p className="text-xs text-slate-300 mt-1 font-medium">
              Obsidian-style graph view. Drag nodes, pan, zoom, and click nodes to view concept explanations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search concepts..."
                className="pl-9 pr-3 py-1.5 bg-[#040816] border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#00E5FF]"
              />
            </div>

            {/* Recenter Button */}
            <button
              onClick={() => rfInstance?.fitView({ padding: 0.3, duration: 400 })}
              className="px-3 py-1.5 bg-slate-900 border border-slate-700 hover:border-[#00E5FF] text-xs font-semibold text-slate-200 rounded-xl transition-colors"
            >
              Reset View
            </button>

            {/* Focus / Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#4F8CFF]/20 border border-[#00E5FF]/40 text-[#00E5FF] hover:bg-[#4F8CFF] hover:text-white rounded-xl text-xs font-bold transition-all"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              <span>{isFullscreen ? 'Exit Focus Mode' : 'Focus Mode'}</span>
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Main React Flow Canvas Area */}
      <div
        className={`
          relative rounded-3xl border-2 border-[#4F8CFF]/30 overflow-hidden bg-[#040816] backdrop-blur-2xl shadow-2xl
          ${isFullscreen ? 'flex-1 min-h-0' : 'h-[550px]'}
        `}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={handleNodeClick}
          onPaneClick={handleClearSelection}
          onInit={setRfInstance}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          attributionPosition="bottom-left"
        >
          <Background color="#334155" gap={28} size={1.5} />
          <Controls className="!bg-[#0A1023] !border-slate-700 !text-slate-100 !rounded-xl overflow-hidden shadow-xl" />
          <MiniMap
            nodeColor="#00E5FF"
            maskColor="rgba(4, 8, 22, 0.85)"
            className="!bg-[#0A1023] !border-slate-700 !rounded-2xl"
          />
        </ReactFlow>

        {/* Selected Node Concept Detail Glass Drawer */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 60 }}
              className="absolute top-4 right-4 w-84 max-w-[calc(100%-2rem)] bg-[#0A1023] border-2 border-[#00E5FF] backdrop-blur-2xl rounded-3xl p-5 shadow-[0_0_40px_rgba(0,229,255,0.3)] z-40 space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <Badge variant="purple" className="mb-1">
                    {selectedNode.data.category || 'Concept Node'}
                  </Badge>
                  <h3 className="text-lg font-extrabold text-white">{selectedNode.data.label}</h3>
                </div>

                <button
                  onClick={handleClearSelection}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Concept Explanation */}
              <div className="p-3.5 bg-[#040816] border border-slate-800 rounded-2xl text-xs text-slate-200 leading-relaxed">
                <p className="font-medium">{selectedNode.data.description}</p>
              </div>

              {/* Connected Neighbor Concepts */}
              {connectedNeighbors.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
                    <span>Connected Concepts ({connectedNeighbors.length})</span>
                  </span>

                  <div className="space-y-1.5 max-h-40 overflow-y-auto">
                    {connectedNeighbors.map((neighbor) => (
                      <div
                        key={neighbor.id}
                        className="p-2.5 bg-[#040816] border border-slate-800 rounded-xl flex items-center justify-between text-xs"
                      >
                        <span className="font-semibold text-white">{neighbor.label}</span>
                        <span className="text-[10px] text-[#00E5FF] font-mono font-bold">{neighbor.relation}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
