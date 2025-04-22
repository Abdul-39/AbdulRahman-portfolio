import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  TextInput, 
  ScrollView,
  ActivityIndicator,
  Modal,
  Alert
} from 'react-native';
import { MaterialIcons, Ionicons, Feather } from '@expo/vector-icons';

// Mock API Service
const mockJobApi = {
  fetchJobs: async (searchTerm = '', location = '') => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock data
    const mockJobs = [
      {
        id: '1',
        title: 'Senior React Native Developer',
        company: 'TechCorp Inc.',
        location: 'San Francisco, CA',
        salary: '$120,000 - $150,000',
        type: 'Full-time',
        posted: '2 days ago',
        description: 'We are looking for an experienced React Native developer to join our team. You will be responsible for building mobile applications for both iOS and Android platforms.',
        requirements: [
          '5+ years of experience with React Native',
          'Strong knowledge of JavaScript and TypeScript',
          'Experience with Redux or other state management libraries',
          'Familiarity with RESTful APIs',
          'Experience with automated testing suites'
        ],
        logo: 'https://logo.clearbit.com/techcorp.com'
      },
      {
        id: '2',
        title: 'UX/UI Designer',
        company: 'DesignHub',
        location: 'Remote',
        salary: '$90,000 - $110,000',
        type: 'Full-time',
        posted: '1 week ago',
        description: 'Join our design team to create beautiful and intuitive user interfaces for our products. You will work closely with product managers and developers.',
        requirements: [
          '3+ years of UX/UI design experience',
          'Portfolio demonstrating design skills',
          'Proficiency in Figma or Sketch',
          'Understanding of user-centered design principles',
          'Experience with user research methods'
        ],
        logo: 'https://logo.clearbit.com/designhub.com'
      },
      {
        id: '3',
        title: 'Backend Developer (Node.js)',
        company: 'DataSystems LLC',
        location: 'New York, NY',
        salary: '$110,000 - $140,000',
        type: 'Full-time',
        posted: '3 days ago',
        description: 'We need a skilled backend developer to help build and maintain our server infrastructure and APIs.',
        requirements: [
          '4+ years of Node.js experience',
          'Strong knowledge of databases (SQL and NoSQL)',
          'Experience with cloud services (AWS, GCP, or Azure)',
          'Understanding of microservices architecture',
          'Experience with Docker and Kubernetes'
        ],
        logo: 'https://logo.clearbit.com/datasystems.com'
      },
      {
        id: '4',
        title: 'Product Manager',
        company: 'InnovateCo',
        location: 'Austin, TX',
        salary: '$130,000 - $160,000',
        type: 'Full-time',
        posted: '5 days ago',
        description: 'Lead our product development team to deliver amazing products that solve real problems for our customers.',
        requirements: [
          '5+ years of product management experience',
          'Technical background or understanding',
          'Excellent communication skills',
          'Experience with Agile methodologies',
          'Data-driven decision making skills'
        ],
        logo: 'https://logo.clearbit.com/innovateco.com'
      },
      {
        id: '5',
        title: 'Data Scientist',
        company: 'AnalyticsPro',
        location: 'Boston, MA',
        salary: '$140,000 - $170,000',
        type: 'Full-time',
        posted: '1 day ago',
        description: 'Use your data science skills to extract insights from large datasets and help drive business decisions.',
        requirements: [
          'PhD or Master\'s in Computer Science, Statistics, or related field',
          '3+ years of experience in data science',
          'Proficiency in Python and R',
          'Experience with machine learning frameworks',
          'Strong statistical knowledge'
        ],
        logo: 'https://logo.clearbit.com/analyticspro.com'
      }
    ];

    // Filter jobs based on search term and location
    let filteredJobs = mockJobs;
    
    if (searchTerm) {
      filteredJobs = filteredJobs.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (location) {
      filteredJobs = filteredJobs.filter(job => 
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    return filteredJobs;
  }
};

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [savedJobs, setSavedJobs] = useState([]);
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const jobsData = await mockJobApi.fetchJobs(searchTerm, location);
      setJobs(jobsData);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch jobs');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchJobs();
  };

  const toggleSaveJob = (job) => {
    if (savedJobs.some(savedJob => savedJob.id === job.id)) {
      setSavedJobs(savedJobs.filter(savedJob => savedJob.id !== job.id));
    } else {
      setSavedJobs([...savedJobs, job]);
    }
  };

  const isJobSaved = (jobId) => {
    return savedJobs.some(job => job.id === jobId);
  };

  const renderJobItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.jobCard} 
      onPress={() => setSelectedJob(item)}
    >
      <View style={styles.jobHeader}>
        <Image 
          source={{ uri: item.logo || 'https://via.placeholder.com/50' }} 
          style={styles.companyLogo} 
        />
        <View style={styles.jobInfo}>
          <Text style={styles.jobTitle}>{item.title}</Text>
          <Text style={styles.companyName}>{item.company}</Text>
        </View>
        <TouchableOpacity onPress={() => toggleSaveJob(item)}>
          <MaterialIcons 
            name={isJobSaved(item.id) ? 'favorite' : 'favorite-border'} 
            size={24} 
            color={isJobSaved(item.id) ? 'red' : '#999'} 
          />
        </TouchableOpacity>
      </View>
      <View style={styles.jobDetails}>
        <Text style={styles.jobLocation}>{item.location}</Text>
        <Text style={styles.jobSalary}>{item.salary}</Text>
      </View>
      <View style={styles.jobFooter}>
        <Text style={styles.jobType}>{item.type}</Text>
        <Text style={styles.jobPosted}>{item.posted}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>JobFinder</Text>
        <TouchableOpacity onPress={() => setShowSaved(true)}>
          <Ionicons name="bookmark" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Feather name="search" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Job title or company"
            value={searchTerm}
            onChangeText={setSearchTerm}
            onSubmitEditing={handleSearch}
          />
        </View>
        <View style={styles.searchInputContainer}>
          <Feather name="map-pin" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Location"
            value={location}
            onChangeText={setLocation}
            onSubmitEditing={handleSearch}
          />
        </View>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Job List */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3498db" />
          <Text style={styles.loadingText}>Loading jobs...</Text>
        </View>
      ) : jobs.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No jobs found</Text>
          <TouchableOpacity 
            style={styles.retryButton} 
            onPress={fetchJobs}
          >
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={jobs}
          renderItem={renderJobItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Job Details Modal */}
      <Modal
        visible={!!selectedJob}
        animationType="slide"
        onRequestClose={() => setSelectedJob(null)}
      >
        {selectedJob && (
          <ScrollView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity 
                style={styles.backButton} 
                onPress={() => setSelectedJob(null)}
              >
                <Ionicons name="arrow-back" size={24} color="#333" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Job Details</Text>
              <TouchableOpacity 
                onPress={() => toggleSaveJob(selectedJob)}
                style={styles.saveButton}
              >
                <MaterialIcons 
                  name={isJobSaved(selectedJob.id) ? 'favorite' : 'favorite-border'} 
                  size={24} 
                  color={isJobSaved(selectedJob.id) ? 'red' : '#333'} 
                />
              </TouchableOpacity>
            </View>

            <View style={styles.jobCard}>
              <View style={styles.jobHeader}>
                <Image 
                  source={{ uri: selectedJob.logo || 'https://via.placeholder.com/50' }} 
                  style={styles.companyLogo} 
                />
                <View style={styles.jobInfo}>
                  <Text style={styles.jobTitle}>{selectedJob.title}</Text>
                  <Text style={styles.companyName}>{selectedJob.company}</Text>
                </View>
              </View>
              <View style={styles.jobDetails}>
                <Text style={styles.jobLocation}>{selectedJob.location}</Text>
                <Text style={styles.jobSalary}>{selectedJob.salary}</Text>
              </View>
              <View style={styles.jobFooter}>
                <Text style={styles.jobType}>{selectedJob.type}</Text>
                <Text style={styles.jobPosted}>{selectedJob.posted}</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Job Description</Text>
              <Text style={styles.sectionContent}>{selectedJob.description}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Requirements</Text>
              {selectedJob.requirements.map((req, index) => (
                <View key={index} style={styles.requirementItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.requirementText}>{req}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply Now</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </Modal>

      {/* Saved Jobs Modal */}
      <Modal
        visible={showSaved}
        animationType="slide"
        onRequestClose={() => setShowSaved(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => setShowSaved(false)}
            >
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Saved Jobs</Text>
            <View style={styles.saveButton} />
          </View>

          {savedJobs.length === 0 ? (
            <View style={styles.emptyContainer}>
              <MaterialIcons name="bookmark-border" size={60} color="#ccc" />
              <Text style={styles.emptyText}>No saved jobs</Text>
              <Text style={styles.emptySubText}>Save jobs to view them here</Text>
            </View>
          ) : (
            <FlatList
              data={savedJobs}
              renderItem={renderJobItem}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.listContainer}
            />
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#3498db',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
  },
  searchButton: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 16,
  },
  jobCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  companyLogo: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  companyName: {
    fontSize: 14,
    color: '#666',
  },
  jobDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  jobLocation: {
    fontSize: 14,
    color: '#666',
  },
  jobSalary: {
    fontSize: 14,
    color: '#2ecc71',
    fontWeight: 'bold',
  },
  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  jobType: {
    fontSize: 14,
    color: '#3498db',
  },
  jobPosted: {
    fontSize: 14,
    color: '#999',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginTop: 16,
  },
  emptySubText: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: '#3498db',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  saveButton: {
    padding: 8,
  },
  section: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  sectionContent: {
    fontSize: 14,
    lineHeight: 22,
    color: '#333',
  },
  requirementItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bullet: {
    marginRight: 8,
  },
  requirementText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
  applyButton: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    alignItems: 'center',
  },
  applyButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default App;
