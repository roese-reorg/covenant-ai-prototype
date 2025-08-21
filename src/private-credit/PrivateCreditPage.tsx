import { Link } from 'react-router-dom'
import SharedNavigation from '../components/SharedNavigation'
import SharedTopBar from '../components/SharedTopBar'
import { useNavigation } from '../contexts/NavigationContext'

export default function PrivateCreditPage() {
  // Navigation state from context
  const {
    isNavExpanded,
    setIsNavExpanded,
    intelExpanded,
    setIntelExpanded,
    covenantsExpanded,
    setCovenantsExpanded,
    sourceFilesExpanded,
    setSourceFilesExpanded,
    companiesExpanded,
    setCompaniesExpanded,
    creditCloudExpanded,
    setCreditCloudExpanded,
    findoxExpanded,
    setFindoxExpanded,
    resourcesExpanded,
    setResourcesExpanded
  } = useNavigation()

  return (
    <div className="h-screen flex bg-[#EFF0FF] overflow-hidden">
      {/* Left Navigation Sidebar */}
      <SharedNavigation 
        isNavExpanded={isNavExpanded}
        setIsNavExpanded={setIsNavExpanded}
        intelExpanded={intelExpanded}
        setIntelExpanded={setIntelExpanded}
        covenantsExpanded={covenantsExpanded}
        setCovenantsExpanded={setCovenantsExpanded}
        sourceFilesExpanded={sourceFilesExpanded}
        setSourceFilesExpanded={setSourceFilesExpanded}
        companiesExpanded={companiesExpanded}
        setCompaniesExpanded={setCompaniesExpanded}
        creditCloudExpanded={creditCloudExpanded}
        setCreditCloudExpanded={setCreditCloudExpanded}
        findoxExpanded={findoxExpanded}
        setFindoxExpanded={setFindoxExpanded}
        resourcesExpanded={resourcesExpanded}
        setResourcesExpanded={setResourcesExpanded}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden h-full">
        {/* Top Bar */}
        <SharedTopBar />

        {/* Main Content with Modal Overlay */}
        <div className="flex-1 relative overflow-hidden">
          {/* Blurred Background Content */}
          <div className="absolute inset-0 blur-sm opacity-30">
            <div className="p-8 space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Private Credit Dashboard</h2>
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-700 mb-2">Deal Flow</h3>
                    <p className="text-3xl font-bold text-blue-600">$2.4B</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-700 mb-2">Active Deals</h3>
                    <p className="text-3xl font-bold text-green-600">47</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-700 mb-2">Pipeline</h3>
                    <p className="text-3xl font-bold text-purple-600">$1.8B</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Overlay */}
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center p-8">
            <div
              className="rounded-xl shadow-2xl w-[75vw] overflow-hidden relative py-[25px]"
              style={{
                backgroundImage: 'url(/private-credit-bg.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* subtle scrim for text contrast */}
              <div className="absolute inset-0 bg-blue-900/60" />
              {/* Video Box and Text Section */}
              <div className="relative px-8 text-center">
                {/* Video Box */}
                <div className="bg-blue-800/70 rounded-lg p-2 mb-8 mx-auto max-w-2xl">
                  <div className="relative rounded-lg overflow-hidden">
                    <img src="/private-credit-video.png" alt="Private Credit video" className="block w-full h-auto" />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <i className="bi bi-play-circle-fill text-white text-6xl" />
                    </div>
                  </div>
                </div>
                
                {/* Text Content */}
                <h2 className="text-base font-bold text-white mb-4">Unlock Private Credit</h2>
                <p className="text-white text-sm mb-8 max-w-2xl mx-auto">
                  Gain access to exclusive insights that can improve your workflows. Simply request access below and a member of our team will contact you shortly.
                </p>
                
                {/* Outlined Buttons with Very Rounded Edges */}
                <div className="flex justify-center gap-4">
                  <button className="border border-white text-white px-[12px] py-[7px] rounded-full text-sm hover:bg-white hover:text-blue-900 transition-colors flex items-center gap-2">
                    <i className="bi bi-download"></i>
                    Download Flyer
                  </button>
                  <button className="border border-white text-white px-[12px] py-[7px] rounded-full text-sm hover:bg-white hover:text-blue-900 transition-colors">
                    Request Access
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
