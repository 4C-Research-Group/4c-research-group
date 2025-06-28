import ResearchDiagram from "@/components/4CResearchDiagram";

export default function ResearchDiagramPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            4C Research Group Structure
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive research areas organized around the four
            core pillars: Cognition, Consciousness, Critical Care, and Comfort.
          </p>
        </div>

        <ResearchDiagram />

        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Click on any project to view details • Hover over sections for more
            information
          </p>
        </div>
      </div>
    </div>
  );
}
