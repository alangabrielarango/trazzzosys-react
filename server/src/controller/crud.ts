import { Model } from 'mongoose';

export const selectData = async <T>(res: any, model: Model<T>, populates?: Array<{ path: string, select: string }>) => {
  try {
    let query = model.find();
    if (populates) {
      populates.forEach((p) => {
        query = query.populate(p.path, p.select)
      });
    }
    const response = await query;
    res.json(response);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const insertData = async <T>(res: any, model: Model<T>, fields: any) => {
  try {
    const { _id, ...rest } = fields;
    const newContact = new model(rest);
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};

export const deleteData = async <T>(res: any, model: Model<T>, ids: any) => {
  try {
    const result = await model.deleteMany({ _id: { $in: ids } });
    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: 'Ningun registro pudo ser eliminado' });
    }
    res.status(200).json({ message: 'Registros eliminados', result });
  } catch (err) {
    console.error(`Error al eliminar registros: ${ids}`);
    res.status(500).json({ message: (err as Error).message });
  }
};

export const updateData = async <T>(
  res: any,
  model: Model<T>,
  id: any,
  fields: any
) => {
  try {
    const { _id, ...rest } = fields;
    const updatedContact = await model.findByIdAndUpdate(id, rest, {
      new: true,
    });
    res.json(updatedContact);
  } catch (err) {
    console.error(`Error al actualizar registro: ${id}`);
    res.status(500).json({ message: (err as Error).message });
  }
};
