import Tour from '../models/Tour.js'; // Make sure to import your Tour model here

export const createTour = async (req, res) => {
    try {
        const newTour = new Tour(req.body);
        const savedTour = await newTour.save();
        res.status(200).json({ success: true, message: 'Tour successfully created', data: savedTour });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ success: false, message: 'Failed to create tour' });
    }
};


// update tour
export const updateTour = async (req, res)=>{
    try {
        const id = req.params.id;
        const updateTour = await Tour.findByIdAndUpdate(id,{
            $set:req.body
        } , {new:true});
        res.status(200).json({
            success:true, 
            message:"Successfully updated", data:updateTour
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Failed to updating tour' });
    }
}

// delete tour
export const deleteTour = async (req, res)=>{
    try {
        const id = req.params.id;
        await Tour.findByIdAndDelete(id);
        res.status(200).json({
            success:true,
            message:"deleted successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Failed to deleting tour' });
    }
}

// get songle tour
export const getSingleTour = async (req, res)=>{
    try {
        const id = req.params.id;
        const getSingleTourData = await Tour.findById(id).populate('reviews');
        res.status(200).json({
            success:true,
            data:getSingleTourData
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Failed to get single tour' });
    }
}

// get all tours
export const getAllTour = async (req, res)=>{
    // pagination
    const page = parseInt(req.query.page);
    // console.log(page);

    try {

        const tours = await Tour.find({}).populate('reviews').skip(page*8).limit(8);

        const getAllTourData = await Tour.find({});
        res.status(200).json({
            success:true,
            count:tours.length,
            data:getAllTourData
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Failed to get all tours' });
    }
}

// get tour by search
export const getTourBySearch = async (req, res) => {
    const cityQuery = new RegExp(req.query.city, 'i');
    const budget = parseFloat(req.query.budget); // Convert budget to a number

    try {
        const data = await Tour.find({ title: cityQuery }).populate('reviews');
        const tours = [];
        for (const item of data) {
            if (item.price <= budget) { // Compare item.price with the numeric budget
                tours.push(item);
            }
        }

        res.status(200).json({
            success: true,
            message: "successful",
            data: tours,
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Not Found',
        });
    }
}


// get Featured Tour
export const getFeaturedTour = async (req, res) => {
    try {
        const tours = await Tour.find({featured:true}).limit(8);
        res.status(200).json({
            success: true,
            message:'successful',
            data: tours,
        });
    } catch (error) {
        res.status(404).json({ success: false, message: 'Failed to get Featured tours' });
    }
}

export const getTourCount = async(req ,res)=>{
    try {
        const tourCount = await Tour.estimatedDocumentCount();
        res.status(200).json({
            success : true,
            data:tourCount,
        });

    } catch (err) {
        res.status(500).json({
            success:false,
            message:'Failed to get count of tours'
        })
    }
}
